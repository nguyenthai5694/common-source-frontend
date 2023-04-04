import React from 'react'
import { CellComponentProps } from 'soumu/blocks/datatable/datatable.type'

/**
 * @see https://web.dev/external-anchors-use-rel-noopener/
 *
 * Sample customData(ColumnConfig.customData)
 * 
 * ```ts
 * customData: {
 *   href: `http://google.com`,
 *   anchorText: dataItem => `See ${dataItem.name}`,
 * }
 * ```
 */
export function ExternalLinkCell<T>(props: CellComponentProps<T>) {
  const anchorText = props.customData.anchorText(props.dataItem);

  return (
    <a href={props.customData.href} title={anchorText} target='_blank' rel='noopener noreferrer'>
      {anchorText}
    </a>
  )
}