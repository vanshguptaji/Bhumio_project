import { Repository } from 'typeorm';

export abstract class BaseRepository<Entity> extends Repository<Entity> {
  async findOneById(id: string, relations?: string[]) {
    return this.findOne({
      where: { id } as any,
      relations,
    });
  }

  async findAll(relations?: string[]) {
    return this.find({
      relations,
    });
  }

  async createAndSave(data: Partial<Entity>): Promise<Entity> {
    const entity = this.create(data as any);
    return this.save(entity);
  }

  async updateAndSave(id: string, data: Partial<Entity>): Promise<Entity> {
    await this.update({ id } as any, data);
    return this.findOneById(id);
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.delete({ id } as any);
    return (result.affected || 0) > 0;
  }
}
