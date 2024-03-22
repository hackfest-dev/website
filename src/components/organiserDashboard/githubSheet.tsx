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
      toast.success("Successfully created repos, teams, and sent invitations");
    },
    onError: () => {
      toast.dismiss();
      toast.error("Error creating repos, teams or sending invitations");
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

  return (
    <Sheet>
      <SheetTrigger disabled={true}>
        <Button variant={"outline"} className="font-semibold">
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
                  toast.loading("Creating repositories, teams etc");
                  sendInvitation.mutate();
                }}
              >
                Create Repositories
              </Button>
              <Label>
                This will create repositories in the organization, create teams,
                send invitations to participants to join respective teams
              </Label>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <Button
                onClick={() => {
                  toast.loading("Disabling commits");
                  enableCommits.mutate();
                }}
              >
                Enable commits
              </Button>
              <Label>
                This will allow all participants&apos; to commit to thier
                respective repositories
              </Label>
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
              <Label>
                This will make all participants&apos; repositories public and
                restrict commits
              </Label>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default GithubSheet;
