import React, { useEffect, useRef } from 'react'
import clsx from 'clsx'
import * as d3 from 'd3'
import BarChart from './bar-chart.component'
import LineChart from './line-chart.component'

export default function Chart({
  // 項目(x軸)
  labels = [],
  // 棒グラフ
  bars = { data: 0 },
  // 線グラフ
  lines,
  // viewport の横幅
  width = 350,
  // viewport の高さ
  height = 200,
  // 2つ以上のチャートを使用するときに使用
  name = '',
  // responsive label of lines fit viewport
  isResponsiveLegend = false,
  // type chart '時間', '件', '％', '個'
  type = null,
  // expand height
  expandHeight = (e) => { return e },
}) {
  const rootRef = useRef()
  const node = useRef()
  const lineRef = useRef()
  const barYAxisRef = useRef()
  const titleBarYAxisRef = useRef()
  const lineYAxisRef = useRef()
  const xAxisRef = useRef()

  // Internet Explorer 6-11
  const isIE = /*@cc_on!@*/!!document['documentMode'];

  let margin = {
    top: 20,
    right: 27,
    bottom: 60,
    left: 35,
  }

  const y = d3
    .scaleLinear()
    .domain([0, 5])
    .nice()
    .range([height - margin.bottom, margin.top])

  // line
  useEffect(() => {
    d3.select(lineRef.current)
      .selectAll('line')
      .data([0, 1, 2, 3, 4, 5])
      .enter()
      .append('line')
      .attr('stroke', '#EDEFF1')
      .attr('x1', margin.left)
      .attr('x2', width - margin.right)
      .attr('y1', (d) => y(d))
      .attr('y2', (d) => y(d))
  }, [margin.left, margin.right, margin.top, width, y])

  useEffect(() => {
    if ((!lines?.length && (!bars || !bars.data))) return;

    d3.select(titleBarYAxisRef.current)
      .attr('font-size', 10)
      .append('text')
      .attr('transform', 'translate(0, 0)')
      .attr('x', 0)
      .attr('y', 0)
      .style('text-anchor', 'middle')
      .text('titleColum')
      .attr('fill', '#676D75')
  }, [lines, type, bars, bars.data])

  // barYAxisRef
  useEffect(() => {
    if (!bars || !bars.data) return

    const dataBarMax = d3.max(bars.data, (e) => e)
    const yMax = dataBarMax >= 50 ? Math.ceil(dataBarMax / 50) * 50 : Math.ceil(dataBarMax / 10) * 10

    d3.select(barYAxisRef.current)
      .attr('font-size', 10)
      .attr('text-anchor', 'end')
      .attr('transform', `translate(${margin.left}, 0)`)
      .selectAll('text')
      .data([0, 1, 2, 3, 4, 5])
      .enter()
      .append('text')
      .attr('x', -3)
      .attr('y', (d) => y(d))
      .attr('dy', '0.32em')
      .attr('fill', '#A3A7AC')
      .text((d) => (yMax / 5) * d)
  }, [bars, bars.data, margin.left, y])

  // lineYAxisRef
  useEffect(() => {
    if (!lines) {
      if (!bars.data)
        d3.selectAll('.p-chart-message')
          .selectAll('text')
          .attr('font-size', 20)
          .attr('font-color', '#EDEFF1')
          .attr('opacity', 0.5)
          .attr('text-anchor', 'middle')
          .attr('x', '50%')
          .attr('y', '40%')

      return
    }

    const dataLineMax = d3.max(lines, (d) => d3.max(d.data, (e) => e))
    const yMax = dataLineMax >= 50 ? Math.ceil(dataLineMax / 50) * 50 : Math.ceil(dataLineMax / 10) * 10

    d3.select(lineYAxisRef.current)
      .attr('font-size', 10)
      .attr('text-anchor', !bars || !bars.data ? 'end' : 'start')
      .attr(
        'transform',
        `translate(${!bars || !bars.data ? margin.left : width - margin.right
        }, 0)`,
      )
      .selectAll('text')
      .data([0, 1, 2, 3, 4, 5])
      .enter()
      .append('text')
      .attr('x', !bars || !bars.data ? -3 : 3)
      .attr('y', (d) => y(d))
      .attr('dy', '0.32em')
      .attr('fill', '#A3A7AC')
      .text((d) => (yMax / 5) * d)
  }, [bars, height, lines, margin.left, margin.right, width, y])

  // xAxisRef
  useEffect(() => {
    const x = d3
      .scaleBand()
      .domain(d3.range(labels.length))
      .range([margin.left, width - margin.right])
      .padding(0.3)

    const xAxis = (g) =>
      g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(
          d3
            .axisBottom(x)
            .tickFormat((i) => {
              const name = labels[i]

              if (name.length > 4) {
                return name.substr(0, Math.round(name.length / 2))
              }

              return name
            })
            .tickSize(0)
            .tickPadding(7),
        )
        .call((g) => g.select('.domain').remove())

    d3.select(xAxisRef.current)
      .attr('class', 'axis x')
      .call(xAxis)
      .selectAll('g.axis.x text')
      .attr('fill', '#676D75')
      .each(function (_, i) {
        const textElement = d3.select(this)

        if (!labels[i]) return

        const text = labels[i]

        if (text.length === 7) {
          textElement.text('')
          textElement.append('tspan').text(text.substr(0, 4))
          textElement
            .append('tspan')
            .attr('x', 0)
            .attr('y', 28)
            .text(text.substr(4))
        } else if (text.length > 4) {
          textElement.text('')
          textElement.append('tspan').text(text.substr(0, 3))
          textElement
            .append('tspan')
            .attr('x', 0)
            .attr('y', 28)
            .text(text.substr(3))
        }
      })
  }, [
    bars.data,
    height,
    labels,
    margin.bottom,
    margin.left,
    margin.right,
    width,
  ])

  return (
    <div className={`p-chart-wrap ${name}`} ref={rootRef}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        ref={node}
        width={isIE ? width : null}
        height={isIE ? height : null}
        preserveAspectRatio='xMidYMid meet'
        className={clsx('p-chart-svg', { '-overflow-visible': isResponsiveLegend })}
      >
        <g ref={lineRef} />

        <g ref={barYAxisRef} />

        {(!lines && !bars.data) && <g className='p-chart-message'> <text>利用可能なデータがありません。</text> </g>}

        <g ref={titleBarYAxisRef} />

        <g ref={lineYAxisRef} />

        <g ref={xAxisRef} />

        {bars && bars.data && (
          <BarChart
            width={width}
            height={height}
            bars={bars}
            margin={margin}
            name={name}
          />
        )}

        {lines && (
          <LineChart
            width={width}
            height={height}
            lines={lines}
            margin={margin}
            name={name}
            isResponsiveLegend={isResponsiveLegend}
            expandHeight={expandHeight}
          />
        )}

        <g fill='rgb(31, 51, 77)' className='tooltip'>
          <rect width='40' height='18' rx='3' ry='3' x='-20' y='-22' />

          <text fontSize='10' x='0' y='-10' fill='rgb(255, 255, 255)' />
        </g>
      </svg>
    </div>
  )
}

export const limitX = (current, width, tooltipWidth) => {
  const tooltipXRange = [tooltipWidth / 2, width - tooltipWidth / 2]

  return Math.max(Math.min(current, tooltipXRange[1]), tooltipXRange[0])
}
