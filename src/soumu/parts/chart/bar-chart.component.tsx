import React, { useEffect, useRef, useMemo } from 'react'
import * as d3 from 'd3'
import { limitX } from './chart.component'

export default function BarChart({
  // 棒グラフ
  bars,
  // viewport の横幅
  width = 400,
  // viewport の高さ
  height = 300,
  margin,
  name,
}) {
  const chartRef = useRef()

  const tooltipClass = useMemo(() => {
    return name === '' ? '.tooltip' : `.${name} .tooltip`
  }, [name])

  useEffect(() => {
    const x = d3
      .scaleBand()
      .domain(d3.range(bars.data.length))
      .range([margin.left, width - margin.right])
      .padding(0.3)

    const dataMax = d3.max(bars.data, (e) => e)
    const yMax = dataMax >= 50 ? Math.ceil(dataMax / 50) * 50 : Math.ceil(dataMax / 10) * 10

    const y = d3
      .scaleLinear()
      .domain([0, yMax])
      .range([height - margin.bottom, margin.top])

    const color = d3.rgb(bars.color)
    const barChart = d3
      .select(chartRef.current)
      .attr('fill', color)
      .selectAll('rect.bar')
      .data(bars.data)

    barChart
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (_, i) => x(i))
      .attr('y', (d) => y(d))
      .attr('height', (d) => y(0) - y(d))
      .attr('width', x.bandwidth())
      .attr('data-index', (_, i) => i)

    const onMouseOver = (event: Event) => {
      const [x, y] = d3.pointer(event, event.target)
      const data =
        bars.data[parseInt((event.target as Element).getAttribute('data-index'))]

      d3.select(tooltipClass)
        .style('visibility', 'visible')
        .attr('transform', `translate(${limitX(x, width, 110)}, ${y})`)
        .select('text')
        .attr('text-anchor', 'middle')
        .attr('domain_baseline', 'central')
        .text(`${data}`)
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

    const barChartMouseEvent = chartRef.current as HTMLElement;

    barChartMouseEvent?.addEventListener('mouseover', onMouseOver);

    barChartMouseEvent?.addEventListener('mousemove', onMouseMove);
    barChartMouseEvent?.addEventListener('mouseout', onMouseOut);

    return () => {
      barChartMouseEvent?.removeEventListener('mouseover', onMouseOver);

      barChartMouseEvent?.removeEventListener('mousemove', onMouseMove);
      barChartMouseEvent?.removeEventListener('mouseout', onMouseOut);
    }
  }, [
    bars.color,
    bars.data,
    height,
    margin.bottom,
    margin.left,
    margin.right,
    margin.top,
    name,
    tooltipClass,
    width,
  ])

  return (
    <g>
      <g ref={chartRef} />
    </g>
  )
}
