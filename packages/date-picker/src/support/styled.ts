import { RichStyle } from '../../../support/stitches.config';

type DeepMergeCandidate = RichStyle | undefined | null;

function deepMergeIterator(...candidates: DeepMergeCandidate[]): RichStyle {
  const result: RichStyle = {};
  for (const candidate of candidates) {
    if (!candidate) {
      // If the candidate is undefined or null, skip it.
      continue;
    }
    for (const key in candidate) {
      if (result.hasOwnProperty(key)) {
        result[key] = deepMergeHelper(result[key], candidate[key]);
      } else {
        result[key] = candidate[key];
      }
    }
  }
  return result;
}

function deepMergeHelper(
  source: any,
  target: any,
): any {
  // If both source and target are objects, merge them with iterator.
  if (typeof source === 'object' && typeof target === 'object') {
    return deepMergeIterator(source, target);
  }
  // Otherwise, use target as return if it is not undefined or null.
  return target ?? source;
}

// TODO: Test it.

/**
 * Deep merge multiple JS objects (mainly used in merging css-in-js styles).
 * @param {DeepMergeCandidate[]} candidates - The objects to merge.
 * @return {RichStyle} - The merged object.
 */
export function deepMerge(...candidates: DeepMergeCandidate[]): RichStyle {
  return deepMergeIterator(...candidates);
}

export const AmsTransition = {
  cubic: (part: string = 'all', duration: number = 0.6) => {
    return `${part} ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`;
  },
  quickCubic: (part: string = 'all') => {
    return AmsTransition.cubic(part, 0.38);
  },
  damp: (part: string = 'all', duration: number = 0.5) => {
    return `${part} ${duration}s cubic-bezier(0.7, 0, 0, 1)`;
  },
};
