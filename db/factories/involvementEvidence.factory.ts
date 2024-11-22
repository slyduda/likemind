import { faker } from "@faker-js/faker";
import { involvementEvidenceInsert } from "@/services";
import { useEvidenceFactory, useInvolvementFactory } from ".";
import type {
  InvolvementEvidenceInsert,
  InvolvementEvidenceSelect,
} from "@/db/models";
import type { Modify } from "@/@types";

type OptionalInvolvementEvidenceInsert = {
  id?: string;
  involvementId?: string;
  evidenceId?: string;
  createdAt?: Date;
  isFake?: boolean;
};

export interface InvolvementEvidenceFactoryCreate
  extends Modify<
    InvolvementEvidenceSelect,
    {
      createdAt?: Date;
    }
  > {}

export const useInvolvementEvidenceFactory = () => {
  const involvementFactory = useInvolvementFactory();
  const evidenceFactory = useEvidenceFactory();

  const create = async (
    insert?: OptionalInvolvementEvidenceInsert,
  ): Promise<InvolvementEvidenceFactoryCreate> => {
    return {
      id: faker.string.uuid(),
      isFake: true,
      ...insert,
      involvementId: insert?.involvementId
        ? insert.involvementId
        : involvementFactory.create().id,
      evidenceId: insert?.evidenceId
        ? insert.evidenceId
        : evidenceFactory.create().id,
    };
  };

  const insert = async (
    insert: InvolvementEvidenceInsert,
  ): Promise<InvolvementEvidenceSelect> => {
    return await involvementEvidenceInsert(insert);
  };

  return { create, insert };
};
