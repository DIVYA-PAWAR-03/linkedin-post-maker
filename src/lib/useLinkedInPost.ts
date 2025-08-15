"use client";

import { useState } from "react";
import { PostData } from "@/lib/types";
import { useSession } from "next-auth/react";

interface UseLinkedInPostOptions {
  onSuccess?: (postId: string) => void;
  onError?: (error: string) => void;
}

export function useLinkedInPost(options: UseLinkedInPostOptions = {}) {
  const [isPosting, setIsPosting] = useState(false);
  const { data: session } = useSession();

  const postToLinkedIn = async (postData: PostData, customDescription?: string) => {
    if (!session) {
      throw new Error("Please sign in to LinkedIn first");
    }

    setIsPosting(true);
    
    try {
      console.log("Making LinkedIn post request...");
      
      const response = await fetch("/api/linkedin/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postData,
          description: customDescription,
        }),
      });

      console.log("Response status:", response.status);
      
      const result = await response.json();
      console.log("Response data:", result);

      if (!response.ok) {
        throw new Error(result.error || "Failed to post to LinkedIn");
      }

      options.onSuccess?.(result.postId);
      return result;
    } catch (error) {
      console.error("LinkedIn post error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      options.onError?.(errorMessage);
      throw error;
    } finally {
      setIsPosting(false);
    }
  };

  return {
    postToLinkedIn,
    isPosting,
    isAuthenticated: !!session,
  };
}
