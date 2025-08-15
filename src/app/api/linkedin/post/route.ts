import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PostData } from "@/lib/types";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Get the session to ensure user is authenticated
    const session = await getServerSession(authOptions) as any;
    
    console.log("Session:", session ? "exists" : "null");
    console.log("Access Token:", session?.accessToken ? "exists" : "missing");
    
    if (!session || !session.accessToken) {
      console.log("Unauthorized: No session or access token");
      return NextResponse.json(
        { error: "Unauthorized - LinkedIn access token required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { postData, description } = body as {
      postData: PostData;
      description?: string;
    };

    if (!postData) {
      return NextResponse.json(
        { error: "Post data is required" },
        { status: 400 }
      );
    }

    // Get user's LinkedIn ID using the new userinfo endpoint
    console.log("Making LinkedIn profile request...");
    const profileResponse = await fetch("https://api.linkedin.com/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Profile response status:", profileResponse.status);
    console.log("Profile response headers:", Object.fromEntries(profileResponse.headers.entries()));
    
    if (!profileResponse.ok) {
      const errorText = await profileResponse.text();
      console.log("Profile error response:", errorText);
      throw new Error(`Failed to get LinkedIn profile: ${profileResponse.status} - ${errorText}`);
    }

    const profile = await profileResponse.json();
    console.log("Profile data:", profile);
    const authorUrn = `urn:li:person:${profile.sub}`;

    // Generate post description from the data
    const postDescription = description || generatePostDescription(postData);

    // Create UGC Post on LinkedIn
    const ugcPostData = {
      author: authorUrn,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: postDescription,
          },
          shareMediaCategory: "NONE",
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    };

    const postResponse = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: JSON.stringify(ugcPostData),
    });

    if (!postResponse.ok) {
      const errorData = await postResponse.text();
      console.error("LinkedIn API Error:", errorData);
      throw new Error(`Failed to post to LinkedIn: ${postResponse.status}`);
    }

    const result = await postResponse.json();
    
    return NextResponse.json({
      success: true,
      postId: result.id,
      message: "Successfully posted to LinkedIn!",
    });
    
  } catch (error) {
    console.error("Error posting to LinkedIn:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to post to LinkedIn" },
      { status: 500 }
    );
  }
}

function generatePostDescription(postData: PostData): string {
  const { title, description, hashtags, content } = postData;
  
  let postText = `📝 ${title}\n\n`;
  
  if (description) {
    postText += `${description}\n\n`;
  }
  
  if (content && content.length > 0) {
    postText += `💡 Key topics covered:\n`;
    content.forEach((item, index) => {
      postText += `${index + 1}. ${item.name}\n`;
    });
    postText += `\n`;
  }
  
  if (hashtags && hashtags.length > 0) {
    postText += hashtags.map(tag => `#${tag.replace(/^#/, '')}`).join(' ');
  }
  
  postText += `\n\n🔗 Created with LinkedIn Post Maker`;
  
  // LinkedIn has a 3000 character limit
  return postText.length > 3000 ? postText.substring(0, 2950) + '...' : postText;
}
