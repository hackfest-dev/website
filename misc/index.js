// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { CriteriaType, PrismaClient } from "@prisma/client";
import { parse } from "path";
const prisma = new PrismaClient();

async function generateCSVs() {
  try {
    const res = {};
    const teams = await prisma.team.findMany({
      where: {
        teamProgress: "SELECTED",
      },
      include: {
        Scores: {
          include: {
            score: true,
            Judges: true,
          },
        },
      },
    });

    const criteria = await prisma.criteria.findMany({
      where: {
        type: "JUDGE",
      },
    });

    criteria.forEach(async (c) => {
      const judgeId = 17;
      const allScores = await prisma.scoresByJudge.findMany({
        where: {
          judgesId: judgeId,
          score: {
            criteriaId: c.id,
          },
        },
        include: {
          score: true,
        },
      });
      const scores = allScores.map((s) => {
        return {
          teamId: s.teamId,
          score: parseInt(s.score.score),
        };
      });
      const scoresArray = allScores.map((s) => {
        return parseInt(s.score.score);
      }).sort();

      let total = 0;
      const min = scoresArray[0] || 0;
      const max = scoresArray[scoresArray.length - 1] || 1;
      const cID = c.id;

      // get all criterias
      // get all scores by judge

      const promises = scores.map(async (s) => {
        const teamI = await prisma.team.findUnique({
          where: {
            id: s.teamId,
          },
        })
       const finalScore = await prisma.team.update({
        where:{
          id: s.teamId
        },
        data:{
          JudgeTotalScore: (teamI?.JudgeTotalScore || 0) + (((s.score - min) / (max-min))*10)
        }
       })
      })
      await Promise.all(promises)

      
    });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

await generateCSVs();
