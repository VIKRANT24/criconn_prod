//node imports
import React, { useEffect, Fragment } from "react";
import { Row, Col, Dropdown, Button } from "react-bootstrap";
import CountUp from 'react-countup';
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";

//local imports
import Card from "../../components/card/card";
import Progress from "../../components/progress/progress";
import * as SettingSelector from "../../store/setting/selectors";


const Dashboard = () => {

  useSelector(SettingSelector.theme_color);

  const getVariableColor = () => {
    let prefix =
      getComputedStyle(document.body).getPropertyValue("--prefix") || "bs-";
    if (prefix) {
      prefix = prefix.trim();
    }
    const color1 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}primary`
    );
    const color2 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}info`
    );
    const color3 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}primary-tint-20`
    );
    const color4 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}warning`
    );
    return {
      primary: color1.trim(),
      info: color2.trim(),
      warning: color4.trim(),
      primary_light: color3.trim(),
    };
  };
  const variableColors = getVariableColor();

  const colors = [variableColors.primary, variableColors.info];
  useEffect(() => {
    return () => colors;
  });

    const chart1 = {
      options: {
        chart: {
          fontFamily:
            '"Inter", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          toolbar: {
            show: false,
          },
          sparkline: {
            enabled: false,
          },
        },
        colors: colors,
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          width: 3,
        },
        yaxis: {
          show: true,
          labels: {
            show: true,
            minWidth: 19,
            maxWidth: 19,
            style: {
              colors: "#8A92A6",
            },
            offsetX: -5,
          },
        },
        legend: {
          show: false,
        },
        xaxis: {
          labels: {
            minHeight: 22,
            maxHeight: 22,
            show: true,
            style: {
              colors: "#8A92A6",
            },
          },
          lines: {
            show: false, //or just here to disable only x axis grids
          },
          categories: ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug"],
        },
        grid: {
          show: false,
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "vertical",
            shadeIntensity: 0,
            gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
            inverseColors: true,
            opacityFrom: 0.4,
            opacityTo: 0.1,
            stops: [0, 50, 80],
            colors: colors,
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      series: [
        {
          name: "total",
          data: [94, 80, 94, 80, 94, 80, 94],
        },
        {
          name: "pipline",
          data: [72, 60, 84, 60, 74, 60, 78],
        },
      ],
    };
  
  

  return (
    <Fragment>
      <Row >
        <Col lg="3" md="6">
          <Card>
            <Card.Body>
              <div className="text-center">Total Tournaments</div>
              <div className="d-flex align-items-center justify-content-between mt-3">
                <div>
                  <h2 className="counter"><CountUp start={0.563} end={2.648} duration={3} decimals={3} /></h2>
                           26.84%
                        </div>
                <div className="border  bg-soft-danger rounded p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <Progress softcolors="danger" color="danger" className="shadow-none w-100" value={50} minvalue={0} maxvalue={100} style={{ height: "6px" }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg="3" md="6">
          <Card>
            <Card.Body>
              <div className="text-center">Total Matches</div>
              <div className="d-flex align-items-center justify-content-between mt-3">
                <div>
                  <h2 className="counter"><CountUp start={0.563} end={2.648} duration={3} decimals={3} /></h2>
                           26.84%
                        </div>
                <div className="border bg-soft-info rounded p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <Progress softcolors="info" color="info" className="shadow-none w-100" value={70} minvalue={0} maxvalue={100} style={{ height: "6px" }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg="3" md="6">
          <Card>
            <Card.Body>
              <div className="text-center">Total Bowlers</div>
              <div className="d-flex align-items-center justify-content-between mt-3">
                <div>
                  <h2 className="counter"><CountUp start={0.563} end={2.648} duration={3} decimals={3} /></h2>
                           26.84%
                        </div>
                <div className="border bg-soft-success rounded p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <Progress softcolors="success" color="success" className="shadow-none w-100" value={75} minvalue={0} maxvalue={100} style={{ height: "6px" }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg="3" md="6">
          <Card>
            <Card.Body>
              <div className="text-center">Total Batsmen</div>
              <div className="d-flex align-items-center justify-content-between mt-3">
                <div>
                  <h2 className="counter"><CountUp start={0.563} end={2.648} duration={3} decimals={3} /></h2>
                           26.84%
                        </div>
                <div className="border  bg-soft-primary rounded p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <Progress softcolors="primary" color="primary" className="shadow-none w-100" value={60} minvalue={0} maxvalue={100} style={{ height: "6px" }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
      <Col md="12">
              <div className="card" data-aos="fade-up" data-aos-delay="800">
                <div className="flex-wrap card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">135</h4>
                    <p className="mb-0">Total Tournaments</p>
                  </div>
                  <div className="d-flex align-items-center align-self-center">
                    <div className="d-flex align-items-center text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <g>
                          <circle
                            cx="12"
                            cy="12"
                            r="8"
                            fill="currentColor"
                          ></circle>
                        </g>
                      </svg>
                      <div className="ms-2">
                        <span className="text-gray">Ongoing</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center ms-3 text-info">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <g>
                          <circle
                            cx="12"
                            cy="12"
                            r="8"
                            fill="currentColor"
                          ></circle>
                        </g>
                      </svg>
                      <div className="ms-2">
                        <span className="text-gray">Completed</span>
                      </div>
                    </div>
                  </div>
                  <Dropdown>
                    <Dropdown.Toggle
                      as={Button}
                      variant="text-gray"
                      type="button"
                      id="dropdownMenuButtonSM"
                    >
                      This Week
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#">This Week</Dropdown.Item>
                      <Dropdown.Item href="#">This Month</Dropdown.Item>
                      <Dropdown.Item href="#">This Year</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="card-body">
                  <Chart
                    options={chart1.options}
                    series={chart1.series}
                    type="area"
                    height="245"
                  />
                </div>
              </div>
            </Col>
      </Row>
    </Fragment>
  )
}

export default Dashboard;
