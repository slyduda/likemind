import {
  forceCenter,
  forceLink,
  forceManyBody,
  forceSimulation,
  select,
  type Simulation,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3";
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
  mass: number;
  createdAt: Date;
  group: number;
}
type EntityMap = {
  [index: string]: EntityComplexRead;
};
export interface EntityComplexFlatRead extends EntityComplexRead {
  loaded: boolean;
}
type EntityFlatMap = {
  [index: string]: EntityComplexFlatRead;
};
type GroupMap = {
  [index: string]: number;
};
type MassMap = {
  [index: string]: number;
};
type MassCacheMap = {
  [index: string]: string[];
};

export const entityComplexFlattener = (map: EntityMap): EntityFlatMap => {
  const flattenedEntities: EntityFlatMap = {};

  // Helper function to recursively flatten related entities
  const flattenRelatedEntities = (entity: EntityComplexRead, root: boolean) => {
    // Add the loaded boolean to the entities definition
    const flatEntity: EntityComplexFlatRead = {
      ...entity,
      loaded: root,
    };

    // If the flattenedEntitiesMap does not contain the id or if the entity isnt in root
    if (root || !Object.hasOwn(flattenedEntities, entity.id))
      flattenedEntities[entity.id] = flatEntity;

    // Get a list of all flattened entities to filter by in the subsequent relatedEntity search
    const flattenedEntityIds = Object.keys(flattenedEntities);
    entity.relatedEntities
      // Filter out all of the entities that have already been included in the list
      .filter((relatedEntity) => !flattenedEntityIds.includes(relatedEntity.id))
      .forEach((filteredRelatedEntity) => {
        flattenRelatedEntities(
          {
            id: filteredRelatedEntity.id,
            createdAt: filteredRelatedEntity.createdAt,
            name: filteredRelatedEntity.name,
            relatedEntities: [],
          },
          false,
        );
      });
  };

  // Loop through all entities at root
  Object.values(map).forEach((entity) => {
    flattenRelatedEntities(entity, true);
  });
  return flattenedEntities;
};

export const entityComplexGroupBuilder = (
  startId: string,
  map: EntityFlatMap,
  startGroup: number = 0,
  groups: GroupMap = {},
) => {
  // Define recursive function
  const traverseEntity = (id: string, groupCount: number) => {
    const entity = map[id];

    if (!Object.hasOwn(groups, entity.id) || groups[entity.id] > groupCount) {
      groups[entity.id] = groupCount;
      entity.relatedEntities.forEach((relatedEntity) => {
        traverseEntity(relatedEntity.id, groupCount + 1);
      });
    }
  };

  // Recurse
  traverseEntity(startId, startGroup);

  return groups;
};

export const entityComplexMassBuilder = (
  startId: string,
  map: EntityFlatMap,
): MassMap => {
  const massCacheMap: MassCacheMap = {};
  const massMap: MassMap = {};

  const traverseMap = (
    entityId: string,
    sourceId: string | null,
    mass: number,
  ) => {
    const entity = map[entityId];

    // If the massMap has the entity id or if the mass is less
    if (!Object.hasOwn(massMap, entity.id) || massMap[entity.id] < mass) {
      massMap[entity.id] = mass;
    }

    // Initialize massCache if it doesnt exist and populate it if there is a source
    if (!Object.hasOwn(massCacheMap, entity.id)) massCacheMap[entity.id] = [];
    if (sourceId) massCacheMap[entity.id].push(sourceId);

    entity.relatedEntities
      .filter(
        (relatedEntity) =>
          !massCacheMap?.[relatedEntity.id]?.includes(entity.id),
      )
      .forEach((filteredRelatedEntity) => {
        traverseMap(
          filteredRelatedEntity.id,
          entity.id,
          massMap[entity.id] *
            (filteredRelatedEntity.relationshipSignificance / 100),
        );
      });
  };

  traverseMap(startId, null, 1);

  return massMap;
};

export const entityComplexDataBuilder = (
  map: EntityFlatMap,
  group: GroupMap,
  mass: MassMap,
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
        mass: mass[value.id],
        group: group[value.id],
      });
    }

    for (const relatedEntity of value.relatedEntities) {
      let target = nodes.findIndex((obj) => obj.id === relatedEntity.id);
      if (target === -1) {
        target = nodes.length;
        nodes.push({
          ...relatedEntity,
          mass: mass[relatedEntity.id],
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

export const entityComplexForceSimulation = (
  element: SVGElement,
  data: EntityD3Data,
  options?: {
    strength?: number;
  },
): Simulation<EntityD3Node, EntityD3Link> => {
  const selection = select(element);

  const { strength = 100 } = options || {};

  if (element) selection.selectAll("*").remove();

  const width = element.clientWidth ?? 600;
  const height = element.clientHeight ?? 600;

  selection.attr("width", width).attr("height", height);

  const { nodes, links } = data;

  const massMultiplier = (mass: number) => {
    return mass * 25 + 5;
  };

  // Create force simulation
  const simulation = forceSimulation(nodes)
    .force("link", forceLink(links))
    .force(
      "charge",
      forceManyBody().strength((d: any) => massMultiplier(d.mass) * -strength),
    )
    .force("center", forceCenter(width / 2 - 20, height / 2));

  // Create links
  const link = selection
    .append("g")
    .attr("stroke-width", 4)
    .attr("class", "stroke-[#94A3B8] dark:stroke-[#1E293B]")
    .attr("stroke-opacity", 20)
    .selectAll("line")
    .data(links)
    .join("line");

  // Create nodes
  const node = selection
    .append("g")
    .attr("stroke-width", 0)
    .attr("class", "stroke-black dark:stroke-stone-50")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", (d: any) => massMultiplier(d.mass))
    .attr("fill", (d: any) =>
      d.group === 0
        ? "#2dd4bf"
        : d.group === 1
          ? "#34d399"
          : d.group === 2
            ? "#fde68a"
            : "#f87171",
    ); // Set the fill color based on the index of the node

  // Add text labels to nodes
  const text = selection
    .append("g")
    .attr("font-weight", "bold")
    .attr("class", "text-black dark:text-stone-50")
    .attr("class", "fill-black dark:fill-stone-50")
    .selectAll("text")
    .data(nodes)
    .join("text")
    .attr("dx", (d: any) => 15 + d.mass * 10) // Offset the text horizontally from the circle
    .attr("dy", (d: any) => -15 - d.mass * 12) // Offset the text vertically to center it
    .attr("class", "text-xs")
    .text((d: any) => (d.group < 3 ? `${d.name}` : ""));

  simulation.on("tick", () => {
    link
      .attr("x1", (d: any) => d.source.x)
      .attr("y1", (d: any) => d.source.y)
      .attr("x2", (d: any) => d.target.x)
      .attr("y2", (d: any) => d.target.y);

    node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);

    text.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y);
  });

  return simulation;
};
