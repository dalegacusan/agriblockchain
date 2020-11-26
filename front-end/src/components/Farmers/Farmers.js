import React from "react";

export default function Farmers(props) {
  const { farmers } = props;

  return (
    <div>
      {
        farmers.map(farmer => {
          const { id, firstName, lastName, lastOnline, location, preferredModeOfCommunication, produce } = farmer;
          return (
            <div key={id} className="card">
              <div className="container">
                <p><b>Full Name:</b> {firstName} {lastName}</p>
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
                  <p>
                    <span>
                      <b>Produce: </b>
                    </span>
                    {
                      produce.map((produce, i) => {
                        return (
                          <span key={i}>{produce}, </span>
                        );
                      })
                    }
                  </p>
                </div>
              </div>
            </div>
          );
        })
      }
    </div>
  )
}