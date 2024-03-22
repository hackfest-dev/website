import { TRPCClientError } from "@trpc/client";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { Octokit } from "octokit";
import { env } from "~/env";

const ORGANIZATION_NAME = env.ORGANIZATION_NAME
const GITHUB_PERSONAL_ACCESS_TOKEN = env.GITHUB_PERSONAL_ACCESS_TOKEN

const octokit = new Octokit({ auth: GITHUB_PERSONAL_ACCESS_TOKEN });
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
          id: true,
          name: true,
          members: {
            select: {
              email: true
            }
          }
        }
      })
      console.log(teams)

      for (const team of teams) {
        if (team.name !== "hello")
          continue
        const githubTeamName = `${team.name}`
        const githubRepoName = `${githubTeamName}`

        const githubTeam = await octokit.rest.teams.create({
          org: ORGANIZATION_NAME,
          name: githubTeamName,
        });
        console.log(`Github team created : ${githubTeam.data.name}`)

        const { id: githubTeamId, slug: githubTeamSlug } = githubTeam.data

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

        const { id: githubRepoId } = githubRepo.data

        const githubInDB = await ctx.db.github.upsert({
          create: {
            githubRepoId: githubRepoId,
            githubRepoName: githubRepoName,
            githubTeamId: githubTeamId,
            githubTeamSlug: githubTeamSlug,
            team: {
              connect: {
                id: team.id
              }
            }
          },
          update: {
            githubRepoId: githubRepoId,
            githubRepoName: githubRepoName,
            githubTeamId: githubTeamId,
            githubTeamSlug: githubTeamSlug,
          },
          where: {
            teamId: team.id
          }
        })
        console.log(githubInDB)

        for (const member of team.members) {
          if (member.email !== "nnm22is002@nmamit.in") continue
          const email = member.email
          const invitation = await octokit.request("POST /orgs/{org}/invitations", {
            org: ORGANIZATION_NAME,
            email: email,
            role: "direct_member",
            team_ids: [githubTeamId],
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          });
          console.log(`Team invitation sent : ${invitation.data.email}`)
        }
      }
    }),

  enableCommits: protectedProcedure
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.role !== "ADMIN"
        && ctx.session.user.role !== "ORGANISER") {
        throw new TRPCClientError("You are not authorized to send invitation")
      }

      const githubTeams = await ctx.db.github.findMany({
        include: {
          team: {
            select: {
              name: true
            }
          }
        }
      })

      for (const githubTeam of githubTeams) {
        await octokit.request('PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}', {
          org: ORGANIZATION_NAME,
          team_slug: githubTeam.githubTeamSlug,
          owner: ORGANIZATION_NAME,
          repo: githubTeam.githubRepoName,
          permission: 'maintain',
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        })
        console.log(`Enabled commit for team : ${githubTeam.team.name}`)
      }
    }),

  disableCommits: protectedProcedure
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.role !== "ADMIN"
        && ctx.session.user.role !== "ORGANISER") {
        throw new TRPCClientError("You are not authorized to send invitation")
      }

      const githubTeams = await ctx.db.github.findMany({
        include: {
          team: {
            select: {
              name: true
            }
          }
        }
      })

      for (const githubTeam of githubTeams) {
        await octokit.request('PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}', {
          org: ORGANIZATION_NAME,
          team_slug: githubTeam.githubTeamSlug,
          owner: ORGANIZATION_NAME,
          repo: githubTeam.githubRepoName,
          permission: 'pull',
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        })
        console.log(`Disabled commit for team : ${githubTeam.team.name}`)
      }
    }),

  makeRepoPrivate: protectedProcedure
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.role !== "ADMIN"
        && ctx.session.user.role !== "ORGANISER") {
        throw new TRPCClientError("You are not authorized to send invitation")
      }

      const githubTeams = await ctx.db.github.findMany({
        include: {
          team: {
            select: {
              name: true
            }
          }
        },
      })

      for (const githubTeam of githubTeams) {
        await octokit.request('PATCH /repos/{owner}/{repo}', {
          owner: ORGANIZATION_NAME,
          repo: githubTeam.githubRepoName,
          private: true,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        })
        console.log(`Made repo private for team : ${githubTeam.team.name}`)
      }
    }),

  makeRepoPublic: protectedProcedure
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.role !== "ADMIN"
        && ctx.session.user.role !== "ORGANISER") {
        throw new TRPCClientError("You are not authorized to send invitation")
      }

      const githubTeams = await ctx.db.github.findMany({
        include: {
          team: {
            select: {
              name: true
            }
          }
        }
      })

      for (const githubTeam of githubTeams) {
        await octokit.request('PATCH /repos/{owner}/{repo}', {
          owner: ORGANIZATION_NAME,
          repo: githubTeam.githubRepoName,
          private: false,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        })
        console.log(`Made repo public for team : ${githubTeam.team.name}`)
      }
    }),
});
