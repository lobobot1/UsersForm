import { successListResponse } from "@lib/http/ResponseHandler";
import prisma from "@lib/prisma";

export async function GET() {
  const answers = await prisma.possibleAnswer.findMany();
  return successListResponse({ data: answers });
}
