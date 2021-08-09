/* eslint-disable camelcase */
import React from 'react';
import { Label, Item, Statistic } from 'semantic-ui-react';

import Panel from 'components/Panel/Panel';

import { useAppointmentContext } from 'hooks/useAppointmentContext';

export const baseClass = 'vcc-appointments-info';
export const vaccineNames = ['COVISHIELD', 'COVAXIN', 'SPUTNIK V'];

function AppoinmentsInfo() {
  const { appointments } = useAppointmentContext();
  const { sessions } = appointments || { sessions: [] };

  if (!appointments || sessions.length === 0) {
    return null;
  }

  const getVaccineInfo = () =>
    sessions?.reduce((acc, curr) => {
      const {
        available_capacity_dose1,
        available_capacity_dose2,
        fee,
        fee_type,
        max_age_limit,
        min_age_limit,
        name,
        vaccine
      } = curr;

      if (
        vaccineNames.includes(vaccine) &&
        (available_capacity_dose1 > 0 || available_capacity_dose2)
      ) {
        const info = {
          vaccineName: vaccine,
          dose1: available_capacity_dose1,
          dose2: available_capacity_dose2,
          centre: name,
          minAge: min_age_limit,
          maxAge: max_age_limit,
          paid: fee_type === 'Paid' ? 'Yes' : 'No',
          fee: fee
        };

        acc.push(info);
      }

      return acc;
    }, []);

  const vaccineAvailable = getVaccineInfo();

  const renderVaccineAvailability = (data) => (
    <Statistic.Group size="small" widths="5">
      <Statistic>
        <Statistic.Value>{data.dose1}</Statistic.Value>
        <Statistic.Label>Dose 1</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>{data.dose2}</Statistic.Value>
        <Statistic.Label>Dose 2</Statistic.Label>
      </Statistic>

      <Statistic>
        <Statistic.Value>{data.paid}</Statistic.Value>
        <Statistic.Label>Paid</Statistic.Label>
      </Statistic>

      <Statistic>
        <Statistic.Value>{`${data.fee}`}</Statistic.Value>
        <Statistic.Label>Price</Statistic.Label>
      </Statistic>

      <Statistic>
        <Statistic.Value>
          {data?.maxAge
            ? `${data.minAge} - ${data.maxAge}`
            : `${data.minAge}+`}
        </Statistic.Value>
        <Statistic.Label>Ages</Statistic.Label>
      </Statistic>
    </Statistic.Group>
  );

  return (
    <div className={baseClass}>
      <Panel header="Available Appointments">
        <Item.Group divided>
          {vaccineAvailable.map((data, index) => (
            <Item key={index} data-testid="item">
              <Item.Content>
                <Label
                  as="a"
                  href="https://selfregistration.cowin.gov.in"
                  circular
                  color="blue"
                  size="large"
                >
                  {data.vaccineName}
                  <Label.Detail>{data.centre}</Label.Detail>
                </Label>
                <Item.Description>
                  {renderVaccineAvailability(data)}
                </Item.Description>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Panel>
    </div>
  );
}

export default AppoinmentsInfo;