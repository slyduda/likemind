import { faker } from "@faker-js/faker";
import { evidenceInsert } from "@/services";
import type { EvidenceInsert, EvidenceSelect } from "@/db/models";
import type { Modify } from "@/@types";

type OptionalEvidenceInsert = {
  id?: string;
  source?: string;
  description?: string;
  createdAt?: Date;
  isFake?: boolean;
};

export interface EvidenceFactoryCreate
  extends Modify<
    EvidenceSelect,
    {
      createdAt?: Date;
    }
  > {}

export const useEvidenceFactory = () => {
  const create = (insert?: OptionalEvidenceInsert): EvidenceFactoryCreate => {
    return {
      id: faker.string.uuid(),
      source: faker.internet.url(),
      description: faker.lorem.paragraph({ min: 1, max: 3 }),
      isFake: true,
      ...insert,
    };
  };

  const insert = async (insert: EvidenceInsert): Promise<EvidenceSelect> => {
    return await evidenceInsert(insert);
  };

  return { create, insert };
};
