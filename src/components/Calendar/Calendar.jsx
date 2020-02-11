import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { addDays } from 'date-fns';
import  WithAuth from '../withAuth'
import './calendar.scss';


class Calendar extends Component {
  createWaterDatesForAllPlants = () => {
    const wateringDates = this.props.plants.map(this.createWaterDates);
    return wateringDates;
  };

  createWaterDates = plant => {
    console.log(new Date(plant.firstWatered));
    let firstWatered = new Date(plant.firstWatered);
    const endDate = new Date('December 31, 2020');
    const daysToWaterPlant = [];
    const daysBetweenWatering = parseInt(plant.waterFrequency);

    while (endDate.getTime() > firstWatered.getTime()) {
      let nextWaterDate = addDays(firstWatered, daysBetweenWatering);

      daysToWaterPlant.push({
        title: plant.nickName,
        start: firstWatered,
        allDay: true //for calendar library use
      });

      firstWatered = nextWaterDate;
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

// events={this.createWaterDatesForAllPlants().flat()}
export default WithAuth(Calendar);



