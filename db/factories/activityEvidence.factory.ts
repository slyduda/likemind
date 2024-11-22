import { faker } from "@faker-js/faker";
import { activityEvidenceInsert } from "@/services";
import { useEvidenceFactory, useActivityFactory } from ".";
import type {
  ActivityEvidenceInsert,
  ActivityEvidenceSelect,
} from "@/db/models";
import type { Modify } from "@/@types";

type OptionalActivityEvidenceInsert = {
  id?: string;
  activityId?: string;
  evidenceId?: string;
  createdAt?: Date;
  isFake?: boolean;
};

export interface ActivityEvidenceFactoryCreate
  extends Modify<
    ActivityEvidenceSelect,
    {
      createdAt?: Date;
    }
  > {}

export const useActivityEvidenceFactory = () => {
  const activityFactory = useActivityFactory();
  const evidenceFactory = useEvidenceFactory();

  const create = async (
    insert?: OptionalActivityEvidenceInsert,
  ): Promise<ActivityEvidenceFactoryCreate> => {
    return {
      id: faker.string.uuid(),
      isFake: true,
      ...insert,
      activityId: insert?.activityId
        ? insert.activityId
        : activityFactory.create().id,
      evidenceId: insert?.evidenceId
        ? insert.evidenceId
        : evidenceFactory.create().id,
    };
  };

  const insert = async (
    insert: ActivityEvidenceInsert,
  ): Promise<ActivityEvidenceSelect> => {
    return await activityEvidenceInsert(insert);
  };

  return { create, insert };
};
