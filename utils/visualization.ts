import type { SimulationLinkDatum, SimulationNodeDatum } from "d3";
import type { EntityComplexRead } from "~/db/services/entity/entityBy";

export interface EntityD3Link extends SimulationLinkDatum<EntityD3Node> {
  source: number;
  target: number;
}
export type EntityD3Data = {
  nodes: EntityD3Node[];
  links: EntityD3Link[];
};
export interface EntityD3Node extends SimulationNodeDatum {
  id: string;
  name: string;
  size: number;
  createdAt: Date;
  group: number;
}
type EntityMap = {
  [index: string]: EntityComplexRead;
};
type GroupMap = {
  [index: string]: number;
};
export const entityComplexDataBuilder = (
  map: EntityMap,
  group: GroupMap,
): EntityD3Data => {
  const nodes: EntityD3Node[] = [];
  const links: EntityD3Link[] = [];
  for (const [key, value] of Object.entries(map)) {
    // If the primary entity in the Complex Read hasnt been added to the nodes list add them
    let source = nodes.findIndex((obj) => obj.id === key);
    if (source === -1) {
      source = nodes.length;
      nodes.push({
        id: value.id,
        name: value.name,
        createdAt: value.createdAt,
        size: 1, // TODO: Size needs to change if it is a secondary Entity since multiple EntityComplexRead can be supplied
        group: group[value.id],
      });
    }

    for (const relatedEntity of value.relatedEntities) {
      let target = nodes.findIndex((obj) => obj.id === relatedEntity.id);
      if (target === -1) {
        target = nodes.length;
        nodes.push({
          ...relatedEntity,
          size: relatedEntity.relationshipSignificance / 100,
          group: group[relatedEntity.id],
        });
      }

      links.push({ source, target });
    }
  }

  return {
    nodes,
    links,
  };
};
