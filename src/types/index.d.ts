import { College, Team, User } from '@prisma/client';

export type members = User & { college: College | null };
export type TeamsData = Team & { members: members[] };
