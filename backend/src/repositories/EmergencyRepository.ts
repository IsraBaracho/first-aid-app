import prisma from "../config/database";
import { Emergency } from "../models/Emergency";

export class EmergencyRepository {
  async findAll(): Promise<Emergency[]> {
    const emergencies = await prisma.emergency.findMany({
      include: {
        steps: {
          orderBy: {
            order: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc", // Mais recentes primeiro
      },
    });

    return emergencies.map(this.mapToEmergency);
  }

  async findById(id: string): Promise<Emergency | null> {
    const emergency = await prisma.emergency.findFirst({
      where: {
        OR: [{ id: id }, { slug: id }],
      },
      include: {
        steps: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    if (!emergency) return null;

    return this.mapToEmergency(emergency);
  }

  async create(emergency: Emergency): Promise<Emergency> {
    const created = await prisma.emergency.create({
      data: {
        id: emergency.id,
        slug: emergency.slug,
        title: emergency.title,
        description: emergency.description,
        cta: emergency.cta,
        tags: emergency.tags,
        steps: {
          create: emergency.steps.map((step, index) => ({
            title: step.title,
            description: step.description,
            order: index,
          })),
        },
      },
      include: {
        steps: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    return this.mapToEmergency(created);
  }

  async update(
    id: string,
    data: Partial<Emergency>,
  ): Promise<Emergency | null> {
    try {
      const exists = await this.findById(id);
      if (!exists) return null;

      if (data.steps) {
        await prisma.step.deleteMany({
          where: { emergencyId: exists.id },
        });
      }

      const updated = await prisma.emergency.update({
        where: {
          id: exists.id,
        },
        data: {
          ...(data.title && { title: data.title }),
          ...(data.slug && { slug: data.slug }),
          ...(data.description !== undefined && {
            description: data.description,
          }),
          ...(data.cta !== undefined && { cta: data.cta }),
          ...(data.tags && { tags: data.tags }),
          ...(data.steps && {
            steps: {
              create: data.steps.map((step, index) => ({
                title: step.title,
                description: step.description,
                order: index,
              })),
            },
          }),
        },
        include: {
          steps: {
            orderBy: {
              order: "asc",
            },
          },
        },
      });

      return this.mapToEmergency(updated);
    } catch (error) {
      console.error("Error updating emergency:", error);
      return null;
    }
  }

  async delete(id: string): Promise<Emergency | null> {
    try {
      const emergency = await this.findById(id);
      if (!emergency) return null;

      await prisma.emergency.delete({
        where: { id: emergency.id },
      });

      return emergency;
    } catch (error) {
      console.error("Error deleting emergency:", error);
      return null;
    }
  }

  private mapToEmergency(prismaEmergency: any): Emergency {
    return {
      id: prismaEmergency.id,
      slug: prismaEmergency.slug,
      title: prismaEmergency.title,
      description: prismaEmergency.description,
      cta: prismaEmergency.cta,
      tags: prismaEmergency.tags,
      steps: prismaEmergency.steps.map((step: any) => ({
        id: step.id,
        title: step.title,
        description: step.description,
        order: step.order,
      })),
      createdAt: prismaEmergency.createdAt,
      updatedAt: prismaEmergency.updatedAt,
    };
  }
}
