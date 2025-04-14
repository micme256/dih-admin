import React from "react";
import Amount from "../elements/Amount";

const KeyMetrics = ({ metricsData = {} }) => {
  return (
    <section className="key-metrics">
      {Object.entries(metricsData).map(([key, value]) => {
        if (value) {
          return (
            <div className="data-item" key={key}>
              <h3 className={key}>{key}</h3>
              {typeof value === "number" ? (
                <Amount amount={value} />
              ) : (
                <p>{value}</p>
              )}
            </div>
          );
        } else {
          return null;
        }
      })}
    </section>
  );
};

export default KeyMetrics;
