import React, { useEffect, useMemo, useRef } from 'react'
import * as d3 from 'd3'
import { limitX } from './chart.component'

export default function LineChart({
  // 線グラフ
  lines,
  // viewport の横幅
  width = 400,
  // viewport の高さ
  height = 300,
  margin,
  name = '',
  isResponsiveLegend = false,
  expandHeight = (e)=> {return e},
}) {
  // Internet Explorer 6-11
  const isIE = /*@cc_on!@*/!!document['documentMode'];

  const chartRef = useRef()
  const circleRef = useRef()
  const legendRef = useRef()
  const tooltipClass = useMemo(
    () => (name === '' ? '.tooltip' : `.${name} .tooltip`),
    [name],
  )

  const lineData = lines.map((x) => x.data)
  const circleData = lines.flatMap((x, i) =>
    x.data.map((y, j) => ({ value: y, color: x.color, i, j })),
  )

  useEffect(() => {
    const x = d3
      .scaleBand()
      .domain(d3.range(d3.max(lines, (d) => d.data.length)))
      .range([margin.left, width - margin.right])
      .padding(0.1)

    const dataMax = d3.max(lines, (d) => d3.max(d.data, (e) => e))
    const yMax = dataMax >= 50 ? Math.ceil(dataMax / 50) * 50 : Math.ceil(dataMax / 10) * 10

    const y = d3
      .scaleLinear()
      .domain([0, yMax])
      .range([height - margin.bottom, margin.top])

    const linePath = d3
      .line()
      .x((_, i) => x(i) + x.bandwidth() / 2)
      .y((d) => y(d))

    d3.select(chartRef.current)
      .selectAll('path')
      .data(lineData)
      .enter()
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', (_, i) => d3.rgb(lines[i].color))
      .attr('d', linePath)

    d3.select(circleRef.current)
      .selectAll('circle')
      .data(circleData)
      .enter()
      .append('circle')
      .attr('fill', (d) => d3.rgb(d.color))
      .attr('cx', (_, i) => x(i % lines[0].data.length) + x.bandwidth() / 2)
      .attr('cy', (d) => y(d.value))
      .attr('r', 2)
      .attr('data-index', (d) => d.i)
      .attr('data-index2', (d) => d.j)
    
     const onMouseOver = (event: Event) => {
      const [x, y] = d3.pointer(event, event.target)
      const line = lines[parseInt((event.target as HTMLElement).getAttribute('data-index'))]
      const data =
        line.data[parseInt((event.target as HTMLElement).getAttribute('data-index2'))]

      d3.select(tooltipClass)
        .style('visibility', 'visible')
        .attr('transform', `translate(${limitX(x, width, 110)}, ${y})`)
        .select('text')
        .attr('text-anchor', 'middle')
        .attr('domain_baseline', 'central')
        .text(`${data}`);

        if (data) {
          const width = 40 + +data?.toString()?.length * 2

          if (width && typeof width === 'number') {
            d3.select(tooltipClass)
            .select('rect')
            .attr('width', `${width}`)
            .attr('x', `${width / 2 * -1}`)
          }
        }
    }

    const onMouseMove = (event: Event) => {
      const [x, y] = d3.pointer(event, event.target)

      d3.select(tooltipClass).attr(
        'transform',
        `translate(${limitX(x, width, 110)}, ${y})`,
      )
    }

    const onMouseOut = () => {
      d3.select(tooltipClass).style('visibility', 'hidden')
    };

    const circleMouseEventElm = circleRef.current as Element;

    circleMouseEventElm?.addEventListener('mouseover', onMouseOver);

    circleMouseEventElm?.addEventListener('mousemove', onMouseMove);
    circleMouseEventElm?.addEventListener('mouseout', onMouseOut);
      
    return () => {
      circleMouseEventElm?.removeEventListener('mouseover', onMouseOver);

      circleMouseEventElm?.removeEventListener('mousemove', onMouseMove);
      circleMouseEventElm?.removeEventListener('mouseout', onMouseOut);
    }
  }, [
    circleData,
    height,
    lineData,
    lines,
    margin.bottom,
    margin.left,
    margin.right,
    margin.top,
    tooltipClass,
    width,
  ])

  // legend
  useEffect(() => {
    const legendData = lines.map((x) => ({ name: x.name, color: x.color }))

    const legend = d3
      .select(legendRef.current)
      .selectAll('text.legend')
      .data(legendData)
      .enter()
      .append('g')

    const legendsWidth = []

    legend
      .append('rect')
      .attr('class', 'legend')
      .attr('x', 0)
      .attr('y', 10)
      .attr('width', 10)
      .attr('height', 10)
      .style('fill', (d) => d3.rgb(d.color))

    legend
      .append('text')
      .attr('class', 'legend')
      .attr('x', 15)
      .attr('y', 19)
      .attr('fill', '#676D75')
      .text((d) =>
        (!!d.name && d.name.length >= 50 && isResponsiveLegend) ? d.name.substr(0,50) + '...' : d.name)
      .each(function (_d) {
        const bbox = this.getBBox()

        legendsWidth.push(bbox.width + bbox.x)
      })
      .attr('font-size', 10)
      .style('text-anchor', 'start')

    legend.append('title')
      .attr('class', 'legend')
      .attr('font-size', 10)
      .style('text-anchor', 'middle')
      .text((d)=> d.name)

    legend.exit().remove()

    const l = legendsWidth.reduce((p, c) => p + c, 0)
    const legendStart = (width - l) / 2
    const widthMax = Math.max(...legendsWidth);
    let order = 0;
    let rowLength = 0;
    let flag = true;

    legend.attr('transform', (_, i) => {
      if(l > width && isResponsiveLegend) {
        const w = legendsWidth.filter((_, j) => i > j).reduce(function(p, c,index) {
          if (p + 2 * widthMax >= width) {
            if(flag) {
              rowLength = ++index
              flag = false
            }

            return 0
          }
          else return p + widthMax
        }, 0)

        if(i % rowLength === 0) order++

        const h = height - 30 + order * 15

        return `translate(${w + width/10}, ${h})`
      } else return `translate(${
          legendsWidth.filter((_, j) => i > j).reduce((p, c) => p + c, 0) + legendStart
        }, ${height - 30})`
    })

    if(l > width && isResponsiveLegend) expandHeight(order * (isIE ? 14.3 : 17))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, isResponsiveLegend, lines, width])

  return (
    <g>
      <g ref={chartRef} />

      <g ref={circleRef} />

      <g ref={legendRef} />
    </g>
  )
}
