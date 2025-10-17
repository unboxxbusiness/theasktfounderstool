
"use client";

import { Facebook, Linkedin, Twitter, Link as LinkIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";

interface SocialShareProps {
  shareUrl: string;
  text: string;
}

export function SocialShare({ shareUrl, text }: SocialShareProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast({
        title: "Copied!",
        description: "The report link has been copied to your clipboard.",
      });
    }, (err) => {
      toast({
        title: "Failed to copy",
        description: "Could not copy link to clipboard.",
        variant: "destructive"
      })
    });
  };

  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="mt-8 space-y-4 rounded-lg border p-4 md:p-6">
        <h3 className="text-md md:text-lg font-semibold text-center">Share Your Report</h3>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Input value={shareUrl} readOnly className="text-sm"/>
            <Button variant="outline" onClick={handleCopy} className="w-full sm:w-auto">
                <LinkIcon className="h-4 w-4 mr-2" /> Copy
            </Button>
        </div>
        <div className="flex items-center justify-center gap-2 sm:gap-4 pt-2">
            <Button asChild variant="ghost" size="icon" className="rounded-full h-10 w-10 sm:h-12 sm:w-12 hover:bg-secondary">
                <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-5 w-5 sm:h-6 sm:w-6 text-[#1DA1F2]" />
                    <span className="sr-only">Share on Twitter</span>
                </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="rounded-full h-10 w-10 sm:h-12 sm:w-12 hover:bg-secondary">
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 text-[#0A66C2]" />
                    <span className="sr-only">Share on LinkedIn</span>
                </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="rounded-full h-10 w-10 sm:h-12 sm:w-12 hover:bg-secondary">
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-5 w-5 sm:h-6 sm:w-6 text-[#1877F2]" />
                    <span className="sr-only">Share on Facebook</span>
                </a>
            </Button>
        </div>
    </div>
  );
}
