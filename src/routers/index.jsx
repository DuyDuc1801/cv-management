import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Home from "../components/Home";
import AllJobs from "../components/Jobs/AllJob";
import JobDetail from "../components/Jobs/JobDetail";
import ListJobsByCompany from "../components/Jobs/ListJobByCompany";
import ListJobsByTag from "../components/Jobs/ListJobsByTag";
import ListJobSearch from "../components/Jobs/ListJobSearch";
import LayoutAdmin from "../components/LayoutAdmin";
import LayoutDefault from "../components/LayoutDefault";

export const routers = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "register",
        element: <Register/>
      },
      {
        path: "Jobs",
        children: [
          {
            index: true,
            element: <AllJobs/>
          },
          {
            path: "Detail/:id",
            element: <JobDetail />
          },
          {
            path: "Tag/:tagId",
            element: <ListJobsByTag />
          }
        ]
      },
      {
        path: "search-result",
        element: <ListJobSearch/>
      },
      {
        path: "/Company",
        children: [
          {
            path: ":idCompany",
            element: <ListJobsByCompany />
          }
        ]
      },

    ],
  },
  {
    path: '/admin',
    element: <LayoutAdmin/>,
    children: [

    ]
  },
  {
    path: "*",
    element: <h2>404 Not found</h2>
  }
];
