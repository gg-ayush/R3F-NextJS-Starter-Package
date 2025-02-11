import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request, { params }) {
  try {
    const id = params.id

    // Fetch the skill by ID
    const skill = await prisma.skills.findUnique({
      where: { skill_id: id },
    })

    if (!skill) {
      return NextResponse.error('Skill not found', 404)
    }

    return NextResponse.json(skill)
  } catch (error) {
    console.error('Error fetching skill', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

export async function PUT(request, { params }) {
  try {
    const { gg_id, skill, certification } = await request.json()
    const id = params.id

    const existingSkill = await prisma.skills.findUnique({
      where: { skill_id: id },
    })

    const newImageUrls = [...existingSkill.certifications, certification ? certification : '']

    const filteredImageUrls = newImageUrls.filter((element) => element !== '')

    // Update the skill
    const updatedSkill = await prisma.skills.update({
      where: { skill_id: id },
      data: { gg_id, skill: [skill], certifications: filteredImageUrls },
    })

    return NextResponse.json(updatedSkill)
  } catch (error) {
    console.error('Error updating skill', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

// Function to delete a skill
export async function DELETE(request, { params }) {
  try {
    const id = params.id

    // Delete the skill
    const deletedSkill = await prisma.skills.delete({
      where: { skill_id: id },
    })

    return NextResponse.json(deletedSkill)
  } catch (error) {
    console.error('Error deleting skill', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
