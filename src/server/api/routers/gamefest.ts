import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const GamefestRouter = createTRPCRouter({
    createTeam: protectedProcedure
    .input(z.object({
        teamName: z.string(),
        game: z.enum(['VALORANT', 'BGMI'])
    }))
    .mutation(async ({input, ctx}) => {
        
        try {
            const user = ctx.session.user;
            if(user.gameTeam) throw new TRPCError({
                code:"BAD_REQUEST",
                message:"User already in a team"
            })
            const team = ctx.db.gameTeam.create({
                data:{
                    name: input.teamName,
                    game: input.game,
                    members:{
                        connect: {
                            id: user.id,
                            
                        }
                    }
                }
            })
    
            const updatedUser = ctx.db.user.update({
                where: {
                    id: user.id
                },
                data: {
                    isLeader: true
                }
            })
            Promise.all([team, updatedUser]);
    
            return team;
        } catch (error) {
            console.log(error);
            throw new TRPCError({
                code:"INTERNAL_SERVER_ERROR",
                message:"Something went wrong"
            })
        }
    }),
    joinTeam: protectedProcedure
    .input(z.object({
        teamId: z.string()
    }))
    .mutation(async ({input, ctx}) => {
        try{
            const user = ctx.session.user;
        if(user.gameTeam) throw new TRPCError({
            code:"BAD_REQUEST",
            message:"User already in a team"
        })
        const team = await ctx.db.gameTeam.findUnique({
            where: {
                id: input.teamId
            },
            include: {
                members: true
            }
        })
        if(!team) throw new TRPCError({
            code:"BAD_REQUEST",
            message:"Team not found"
        })
        if((team.game === 'VALORANT' && team.members.length === 5) || (team.game === 'BGMI' && team.members.length === 4) ) throw new TRPCError({
            code:"BAD_REQUEST",
            message:"Team is full"
        })
        const updatedUser = await ctx.db.user.update({
            where: {
                id: user.id
            },
            data: {
                gameTeam: {
                    connect: {
                        id: team.id
                    }
                }
            }
        })

        
        return updatedUser;
        }catch(error){
            console.log(error);
            throw new TRPCError({
                code:"INTERNAL_SERVER_ERROR",
                message:"Something went wrong"
            })
        }
    }),

    leaveTeam: protectedProcedure
    .input(z.object({
        teamId: z.string()
    }))
    .mutation(async ({input, ctx}) => {
        try{
            const user = ctx.session.user;
        if(!user.gameTeam) throw new TRPCError({
            code:"BAD_REQUEST",
            message:"User not in a team"
        })
        const team = await ctx.db.gameTeam.findUnique({
            where: {
                id: input.teamId
            },
            include: {
                members: true
            }
        })
        if(!team) throw new TRPCError({
            code:"BAD_REQUEST",
            message:"Team not found"
        })
        const updatedUser = await ctx.db.user.update({
            where: {
                id: user.id
            },
            data: {
                gameTeam: {
                    disconnect: true
                }
            }
        })

        
        return updatedUser;
        }catch(error){
            console.log(error);
            throw new TRPCError({
                code:"INTERNAL_SERVER_ERROR",
                message:"Something went wrong"
            })
        }
    }),
    deleteTeam: protectedProcedure
    .input(z.object({
        teamid: z.string()
    }))
    .mutation(async ({input, ctx}) => {
        try {
            const user = ctx.session.user;
      
            if (!user?.isLeader) {
              throw new TRPCError({
                code: "BAD_REQUEST",
                message: "You are not the leader of this team",
              });
            }
      
            await ctx.db.gameTeam.update({
              data: {
                members: {
                  updateMany: {
                    where: {
                      teamId: user.team?.id,
                    },
                    data: {
                      isLeader: false,
                    },
                  },
                },
              },
              where: {
                id: user.team?.id,
              },
            });
      
            await ctx.db.team.delete({
              where: {
                id: user.team?.id,
              },
            });
      
            return { status: "success", message: "Team deleted successfully" };
          } catch (error) {
            console.log(error);
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Something went wrong",
            });
          }
    }),
    confirmTeam: protectedProcedure
    .input(z.object({
        teamId: z.string()
    }))
    .mutation(async  ({ctx,input}) => {
        try {
            const user = ctx.session.user;
            if(!user.isLeader){
                throw new TRPCError({
                    code: 'FORBIDDEN',
                    message: 'You are not the leader of this team'
                })
            }
            const team = await ctx.db.gameTeam.findUnique({
                where: {
                    id: input.teamId
                },
                include: {
                    members: true
                }
            })

            if(!team){
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Team not found'
                })
            }

            if((team?.game === 'VALORANT' && team.members.length !== 5) || (team?.game === 'BGMI' && team.members.length !== 4)){
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Team is not full'
                })
            }

            const updatedteam = await ctx.db.gameTeam.update({
                data: {
                    isConfirmed: true
                },
                where: {
                    id: team.id
                }
            })

            return updatedteam;
        } catch (error) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Something went wrong'
            })
        }
    })

})