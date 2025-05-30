// import {
//   Card,
//   CardBody,
//   CardHeader,
//   Typography,
// } from "@material-tailwind/react";
import { getAllExpensesQueryOption } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
// import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

// const chartConfig = {
//   chart: {
//     type: "bar",
//     height: 240,
//     width: 400,
//     series: [
//       {
//         name: "Sales",
//         data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
//       },
//     ],
//     options: {
//       chart: {
//         toolbar: {
//           show: false,
//         },
//       },
//       title: {
//         show: "",
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       colors: ["#020617"],
//       plotOptions: {
//         bar: {
//           columnWidth: "40%",
//           borderRadius: 2,
//         },
//       },
//       xaxis: {
//         axisTicks: {
//           show: false,
//         },
//         axisBorder: {
//           show: false,
//         },
//         labels: {
//           style: {
//             colors: "#616161",
//             fontSize: "12px",
//             fontFamily: "inherit",
//             fontWeight: 400,
//           },
//         },
//         categories: [
//           "Apr",
//           "May",
//           "Jun",
//           "Jul",
//           "Aug",
//           "Sep",
//           "Oct",
//           "Nov",
//           "Dec",
//         ],
//       },
//       yaxis: {
//         labels: {
//           style: {
//             colors: "#616161",
//             fontSize: "12px",
//             fontFamily: "inherit",
//             fontWeight: 400,
//           },
//         },
//       },
//       grid: {
//         show: true,
//         borderColor: "#dddddd",
//         strokeDashArray: 5,
//         xaxis: {
//           lines: {
//             show: true,
//           },
//         },
//         padding: {
//           top: 5,
//           right: 20,
//         },
//       },
//       fill: {
//         opacity: 0.8,
//       },
//       tooltip: {
//         theme: "dark",
//       },
//     },
//   },
// };

export default function BarChart() {
  const { isPending, error, data } = useQuery(getAllExpensesQueryOption);

  // const amountDataArr = data?.expenses?.map((a: any) => {
  //   return [a.date, a.amount];
  // });

  const xAxis = [
    "Jan-2024",
    "Feb-2024",
    "Mar-2024",
    "Apr-2024",
    "May-2024",
    "Jun-2024",
    "Jul-2024",
    "Aug-2024",
    "Sep-2024",
    "Oct-2024",
    "Nov-2024",
    "Dec-2024",
  ];

  console.log("Data ", data, "amount data", xAxis);
  const options: ApexOptions = {
    chart: {
      height: 140,
      stacked: true,
      zoom: {
        enabled: true,
      },
      foreColor: "white",
    },
    tooltip: {
      theme: "dark",
    },
    xaxis: {
      type: "datetime",
      categories: xAxis,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
  };

  // const series = [
  //   {
  //     name: "Expenses",
  //     data: amountDataArr,
  //   },
  // ];
  // const series = data?.expenses?.map((el: any) => ({
  //   name: el.type,
  //   data: [el.amount],
  // }));

  const expenseTypes = [
    "entertainment",
    "food",
    "vehicle/fuel",
    "snacks",
    "sports/play/turf",
    "misc",
  ];

  const series = [
    {
      name: "entertainment",
      data: [100, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: "food",
      data: [200, 0, 0, 210, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];

  const srs = expenseTypes.map((ty) => {
    return data?.expenses?.filter((exp: any) => exp?.type?.toLowerCase() == ty);
  });

  console.log("sereess ", srs);

  if (isPending) return <div>Loading...</div>;
  if (error) return <>Error {error.message}</>;

  return (
    <ReactApexChart options={options} series={series} type="bar" height={400} />
  );
  //   return (
  //     <Card>
  //       <CardHeader
  //         floated={false}
  //         shadow={false}
  //         color="transparent"
  //         className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
  //       >
  //         <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
  //           <Square3Stack3DIcon className="h-6 w-6" />
  //         </div>
  //         <div>
  //           <Typography variant="h6" color="blue-gray">
  //             Bar Chart
  //           </Typography>
  //           <Typography
  //             variant="small"
  //             color="gray"
  //             className="max-w-sm font-normal"
  //           >
  //             Visualize your data in a simple way using the
  //             @material-tailwind/react chart plugin.
  //           </Typography>
  //         </div>
  //       </CardHeader>
  //       <CardBody className="px-2 pb-0">
  //         <Chart {...chartConfig} />
  //       </CardBody>
  //     </Card>
  //   );
}
