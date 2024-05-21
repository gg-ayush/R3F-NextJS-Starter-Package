import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Function to create a skill
export async function POST(request) {
  try {
    const { gg_id, skill } = await request.json()

    const newSkill = await prisma.skills.create({
      data: {
        gg_id,
        skill: [skill],
      },
    })
    return NextResponse.json(newSkill)
  } catch (error) {
    console.error('Error Creating Skill', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

// Function to read all skills
export async function GET() {
  try {
    const skills = await prisma.skills.findMany()
    return NextResponse.json(skills)
  } catch (error) {
    console.error('Error fetching skills', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
