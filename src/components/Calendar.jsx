import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { addDays } from 'date-fns';
import '../main.scss';

class Calendar extends Component {
  createWaterDatesForAllPlants = () => {
    const wateringDates = this.props.plants.map(this.createWaterDates);
    return wateringDates;
  };

  createWaterDates = plant => {
    console.log(plant);
    let startDate = new Date('Dec 16, 2019');
    const endDate = new Date('March 9, 2020');
    const daysToWaterPlant = [];
    const daysBetweenWatering = parseInt(plant.daysBetweenWatering);

    while (endDate.getTime() > startDate.getTime()) {
      let waterDate = addDays(startDate, daysBetweenWatering);

      daysToWaterPlant.push({
        title: plant.name,
        start: startDate,
        allDay: true //for calendar library use
      });

      startDate = waterDate;
    }
    return daysToWaterPlant;
  };

  render() {
    return (
      <div className='calendar-container'>
        <div className='calendar'>
          <FullCalendar
            defaultView='dayGridMonth'
            aspectRatio={1.75}
            weekends={false}
            events={this.createWaterDatesForAllPlants().flat()}
            eventLimit={4}
            eventColor={'#3B5A37'}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          />
        </div>
      </div>
    );
  }
}

export default Calendar;
