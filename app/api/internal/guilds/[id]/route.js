import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request, { params }) {
  try {
    const id = params.id
    const guild = await prisma.guilds.findUnique({
      where: {
        id: id,
      },
    })

    if (!guild) {
      return NextResponse.error('guild not found', 404)
    }

    return NextResponse.json(guild)
  } catch (error) {
    console.error('failed to fetch guild', error)
    return NextResponse.error('internal server error', 500)
  }
}

export async function PUT(request, { params }) {
  try {
    const id = params.id
    const data = await request.json()
    const { description, guild, avatar_img, soft_skills, additional_skills, color, symbol, gg_id, alignment } = data
    const updated_guild = await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        description,
        guild,
        avatar_img,
        soft_skills,
        additional_skills,
        color,
        symbol,
        gg_id,
        alignment,
      },
    })
    return NextResponse.json(updated_guild)
  } catch (error) {
    console.error('failed to update the guild', error)
    return NextResponse.error('internal server error', 500)
  }
}
