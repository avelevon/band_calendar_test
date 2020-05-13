import './index.scss'

import React, {useRef, useEffect, useCallback, useState} from 'react';
import ReactDom from 'react-dom';

import CalendarContainer from 'band_calendar'
// import CalendarContainer from 'C:\\Users\\levon\\Documents\\OSPanel\\domains\\band_calendar\\src'
console.log(CalendarContainer)
const App = () => {

    const [homeNode, setHomeNode] = useState()
    const [range, setRange] = useState([10, 10])
    const [scrollToToday, setScrollToToday] = useState(true)
    const [dates, setDates] = useState([])

    useEffect(() => {
        setDates(CalendarContainer.getDates(range))
    }, [range])

    const increaseRange = () => {
        setRange(prevState => ([prevState[0] + 10, prevState[1] + 10]))
    }

    const homeRef = useCallback(node => {
        node && !homeNode ? setHomeNode(node) : null
    }, [])

    const scrollToTodayHandler = () => {
        setScrollToToday(false)
    }

    useEffect(() => {
        setScrollToToday(true)
    }, [scrollToToday])

    let arr = []
    for (let i = 0; i < 10; i++) {
        arr.push(i)
    }

    return (
        <div className="layout">
            <table ref={homeRef}>
                <thead className="Calendar">
                {homeNode && <CalendarContainer
                    homeNode={homeNode}
                    range={range}
                    scrollToToday={scrollToToday}
                />}
                </thead>
                <tbody>
                    {arr.map((item, i) => <tr key={i}>
                        <td>Row {i}</td>
                        {dates.map((date, i) => <td key={date.format() + i}>{date.format('MMMM Do YYYY')}</td>)}
                    </tr>)}
                </tbody>
            </table>
            <button onClick={increaseRange}>Load More Dates</button>
            <button onClick={scrollToTodayHandler}>Scroll To Today</button>
        </div>
    );
};

ReactDom.render(
    <App/>,
    document.getElementById('wrapper')
);