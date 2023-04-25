import isAdminRequest from "@lib/auth/isAdminRequest";
import { someFieldMissing, someFieldUnique, unauthorized } from "@lib/http/ErrorHandler";
import { creationResponse } from '@lib/http/ResponseHandler';
import prisma from "@lib/prisma";

/** @param {Request} req */
export async function POST(req) {
  if (!(await isAdminRequest(req))) return unauthorized({ entity: "create answers" });

  const bodyAsJson = await req.json();
  if (!validateBody(bodyAsJson)) return someFieldMissing();

  try {
    await prisma.possibleAnswer.create({
      data: {
        answer: bodyAsJson.answer,
        topicId: bodyAsJson.topicId,
      },
    });
    return creationResponse({ message: "an answer has been created" })
  } catch (error) {
    return someFieldUnique(error);
  }
}

function validateBody(body) {
  return !(
    !body || !body.answer || body.answer === "" || !body.topicId || typeof body.topicId !== "number"
  );
}
