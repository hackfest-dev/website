import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import Link from "next/link";
import { api } from "~/utils/api";
import { toast } from "sonner";

const GithubSheet = () => {
  const sendInvitation = api.github.sendInvitation.useMutation({
    onSuccess: () => {
      toast.dismiss();
      toast.success("Successfully created teams, repos, and sent invitations");
    },
    onError: () => {
      toast.dismiss();
      toast.error("Error creating teams, repos or sending invitations");
    },
  });

  const disableCommits = api.github.disableCommits.useMutation({
    onSuccess: () => {
      toast.dismiss();
      toast.success("Successfully disabling commits");
    },
    onError: () => {
      toast.dismiss();
      toast.error("Error disabling commits");
    },
  });

  const enableCommits = api.github.enableCommits.useMutation({
    onSuccess: () => {
      toast.dismiss();
      toast.success("Successfully enabling commits");
    },
    onError: () => {
      toast.dismiss();
      toast.error("Error enabling commits");
    },
  });

  const makeRepoPrivate = api.github.makeRepoPrivate.useMutation({
    onSuccess: () => {
      toast.dismiss();
      toast.success("Successfully made repo private");
    },
    onError: () => {
      toast.dismiss();
      toast.error("Error making repo private");
    },
  });

  const makeRepoPublic = api.github.makeRepoPublic.useMutation({
    onSuccess: () => {
      toast.dismiss();
      toast.success("Successfully made repo public");
    },
    onError: () => {
      toast.dismiss();
      toast.error("Error making repo public");
    },
  });

  // TODO: remove this hardcoded value
  const githubAllowed = true;

  return (
    <Sheet>
      <SheetTrigger disabled={!githubAllowed}>
        <Button
          variant={githubAllowed ? "default" : "outline"}
          className="font-semibold"
        >
          Github
        </Button>
      </SheetTrigger>
      <SheetContent className="dark bg-slate-950">
        <SheetHeader className="mt-4">
          <SheetTitle className="text-2xl text-white">
            Github Related Actions
          </SheetTitle>
          <SheetDescription className="flex flex-col items-center justify-center gap-7">
            <Label className="text-lg">
              Organization Name :{" "}
              <span className="font-mono text-blue-400 underline">
                <Link href={"https://github.com/hackfest-dev"} target="_blank">
                  Hackfest
                </Link>
              </span>
            </Label>
            <div className="flex flex-col items-center justify-center gap-2">
              <Button
                onClick={() => {
                  toast.loading(
                    "Creating teams, repositories, sending invitations",
                  );
                  sendInvitation.mutate();
                }}
              >
                Create Repositories
              </Button>
              <Label>
                This will create teams, create repos, send invitations to
                participants to join respective teams
              </Label>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <Button
                onClick={() => {
                  toast.loading("Enabling commits");
                  enableCommits.mutate();
                }}
              >
                Enable commits
              </Button>
              <Label>Enables commits for every team to thier repo</Label>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <Button
                onClick={() => {
                  toast.loading("Disabling commits");
                  disableCommits.mutate();
                }}
              >
                Disable commits
              </Button>
              <Label>Disales commit for every team to thier repo</Label>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <Button
                onClick={() => {
                  toast.loading("Making repo private");
                  makeRepoPrivate.mutate();
                }}
              >
                Make Repo Private
              </Button>
              <Label>Makes the repo private</Label>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <Button
                onClick={() => {
                  toast.loading("Making repo public");
                  makeRepoPublic.mutate();
                }}
              >
                Make Repo Public
              </Button>
              <Label>Makes the repo public</Label>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default GithubSheet;
