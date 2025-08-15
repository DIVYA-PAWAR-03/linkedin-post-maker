"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Share2Icon } from "lucide-react";
import { useLinkedInPost } from "@/lib/useLinkedInPost";
import usePost from "@/lib/usePost";
import { useToast } from "@/components/ui/use-toast";
import { PostData } from "@/lib/types";

interface LinkedInPostDialogProps {
  disabled?: boolean;
}

export default function LinkedInPostDialog({ disabled }: LinkedInPostDialogProps) {
  const [open, setOpen] = useState(false);
  const [customDescription, setCustomDescription] = useState("");
  const { contentObject } = usePost();
  const { toast } = useToast();

  const { postToLinkedIn, isPosting, isAuthenticated } = useLinkedInPost({
    onSuccess: (postId) => {
      toast({
        title: "Success!",
        description: "Your post has been shared to LinkedIn successfully.",
      });
      setOpen(false);
      setCustomDescription("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    },
  });

  const generatePreview = (postData: PostData, customDesc?: string): string => {
    if (customDesc) return customDesc;
    
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
    
    return postText.length > 3000 ? postText.substring(0, 2950) + '...' : postText;
  };

  const handlePost = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please connect your LinkedIn account first.",
        variant: "destructive",
      });
      return;
    }

    try {
      await postToLinkedIn(contentObject, customDescription || undefined);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const previewText = generatePreview(contentObject, customDescription);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={disabled || !isAuthenticated} variant="outline">
          <Share2Icon className="w-4 h-4 mr-2" />
          Post to LinkedIn
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Share to LinkedIn</DialogTitle>
          <DialogDescription>
            Customize your post description or use the auto-generated one.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="description">Post Description</Label>
            <Textarea
              id="description"
              placeholder="Enter custom description or leave empty to use auto-generated..."
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
              className="min-h-[120px]"
            />
            <div className="text-sm text-muted-foreground">
              {customDescription.length > 0 ? customDescription.length : previewText.length} / 3000 characters
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="border rounded-md p-3 bg-muted/50 text-sm max-h-[200px] overflow-y-auto whitespace-pre-wrap">
              {previewText}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handlePost} disabled={isPosting}>
            {isPosting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                Posting...
              </>
            ) : (
              <>
                <Share2Icon className="w-4 h-4 mr-2" />
                Post to LinkedIn
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
