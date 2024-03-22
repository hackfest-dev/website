import { TRPCClientError } from "@trpc/client";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { Octokit } from "octokit";
import { env } from "~/env";

const ORGANIZATION_NAME = env.ORGANIZATION_NAME
const GITHUB_PERSONAL_ACCESS_TOKEN = env.GITHUB_PERSONAL_ACCESS_TOKEN

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit({ auth: GITHUB_PERSONAL_ACCESS_TOKEN });

// Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
const { data: { login } } = await octokit.rest.users.getAuthenticated();
console.log("Hello, %s", login);

export const githubRouter = createTRPCRouter({
  // TODO: change name
  sendInvitation: protectedProcedure
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.role !== "ADMIN"
        && ctx.session.user.role !== "ORGANISER") {
        throw new TRPCClientError("You are not authorized to send invitation")
      }

      const teams = await ctx.db.team.findMany({
        where: {
          teamProgress: "SELECTED",
        },
        select: {
          name: true,
          members: {
            select: {
              // TODO: add whatever resume or something
              email: true
            }
          }
        }
      })

      for (const team of teams) {
        if (team.name !== "hello")
          continue
        const githubTeamName = `${team!.name}`
        const githubRepoName = `${githubTeamName}`

        const githubTeam = await octokit.rest.teams.create({
          org: ORGANIZATION_NAME,
          name: githubTeamName,
        });
        console.log(`Github team created : ${githubTeam.data.name}`)
        const { id: githubTeamId } = githubTeam.data

        const githubRepo = await octokit.request('POST /orgs/{org}/repos', {
          org: ORGANIZATION_NAME,
          name: githubRepoName,
          description: `Repository of team - [${githubTeamName}] for hackfest`,
          private: true,
          team_id: githubTeamId,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        })
        console.log(`Github repo created : ${githubRepo.data.name}`)

        for (const member of team!.members) {
          if (member.email === "prabhuomkar9@gmail.com") continue
          const email = member.email!
          const invitation = await octokit.request("POST /orgs/{org}/invitations", {
            org: ORGANIZATION_NAME,
            email: email,
            role: "direct_member",
            team_ids: [githubTeamId],
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          });
          console.log(`Team invitation sent : ${invitation.data.login}`)
        }
      }
    }),

  enableCommits: protectedProcedure
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.role !== "ADMIN"
        && ctx.session.user.role !== "ORGANISER") {
        throw new TRPCClientError("You are not authorized to send invitation")
      }

      const teams = await ctx.db.team.findMany({
        where: {
          teamProgress: "SELECTED",
        },
        select: {
          name: true,
          members: {
            select: {
              // TODO: add whatever resume or something
              email: true
            }
          }
        }
      })

      for (const team of teams) {
        // await octokit.request('PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}', {
        //   org: 'ORG',
        //   team_slug: 'TEAM_SLUG',
        //   owner: 'OWNER',
        //   repo: 'REPO',
        //   permission: 'maintain',
        //   headers: {
        //     'X-GitHub-Api-Version': '2022-11-28'
        //   }
        // })
      }
    }),

  disableCommits: protectedProcedure
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.role !== "ADMIN"
        && ctx.session.user.role !== "ORGANISER") {
        throw new TRPCClientError("You are not authorized to send invitation")
      }

      const teams = await ctx.db.team.findMany({
        where: {
          teamProgress: "SELECTED",
        },
        select: {
          name: true,
          members: {
            select: {
              // TODO: add whatever resume or something
              email: true
            }
          }
        }
      })

      for (const team of teams) {
        // await octokit.request('PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}', {
        //   org: 'ORG',
        //   team_slug: 'TEAM_SLUG',
        //   owner: 'OWNER',
        //   repo: 'REPO',
        //   permission: 'view',
        //   headers: {
        //     'X-GitHub-Api-Version': '2022-11-28'
        //   }
        // })
      }

    })
});
