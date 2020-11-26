import React from "react";

export default function Farmers(props) {
  const { farmers } = props;
  return (
    <div>
      {
        farmers.map(farmer => {
          const { firstName, lastName, lastOnline, location, preferredModeOfCommunication, produce } = farmer;
          return (
            <div>
              <p>
                <b>Name:</b> {firstName} {lastName}
              </p>
              <p>
                <b>Last Online:</b> {lastOnline}
              </p>
              <p>
                <b>Location:</b> {location}
              </p>
              <p>
                <b>Preferred Mode of Communication:</b> {preferredModeOfCommunication}
              </p>
              <div>
                <span><b>Produce: </b></span>
                {
                  produce.map(produce => {
                    return (
                      <span>{produce}, </span>
                    );
                  })
                }
              </div>
            </div>
          );
        })
      }
    </div>
  );
}