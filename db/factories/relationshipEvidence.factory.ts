import { faker } from "@faker-js/faker";
import { useEvidenceFactory, useRelationshipFactory } from ".";
import type {
  RelationshipEvidenceInsert,
  RelationshipEvidenceSelect,
} from "@/db/models";
import { relationshipEvidenceInsert } from "~/services";
import type { Modify } from "@/@types";

type OptionalRelationshipEvidenceInsert = {
  id?: string;
  relationshipId?: string;
  evidenceId?: string;
  createdAt?: Date;
  isFake?: boolean;
};

export interface RelationshipEvidenceFactoryCreate
  extends Modify<
    RelationshipEvidenceSelect,
    {
      createdAt?: Date;
    }
  > {}

export const useRelationshipEvidenceFactory = () => {
  const relationshipFactory = useRelationshipFactory();
  const evidenceFactory = useEvidenceFactory();

  const create = async (
    insert?: OptionalRelationshipEvidenceInsert,
  ): Promise<RelationshipEvidenceFactoryCreate> => {
    return {
      id: faker.string.uuid(),
      isFake: true,
      ...insert,
      relationshipId: insert?.relationshipId
        ? insert.relationshipId
        : relationshipFactory.create().id,
      evidenceId: insert?.evidenceId
        ? insert.evidenceId
        : evidenceFactory.create().id,
    };
  };

  const insert = async (
    insert: RelationshipEvidenceInsert,
  ): Promise<RelationshipEvidenceSelect> => {
    return await relationshipEvidenceInsert(insert);
  };

  return { create, insert };
};
