import { Grid } from "@mui/material";
import PageHeader from "../../Component/commonPageHeader";
import CalendarView from "../Calender/calender";
import CommisionContainer from "../../Component/container";
import { useAppSelector } from "../../Store/StoreConfig";
import { useGetallshiftQuery } from "../../Api/shiftApi";

const sampleShifts = [
  {
    id: 1,
    startTime: "09:00",
    endTime: "17:00",
    shiftType: "Morning",
    startDate: "2025-10-05",
    endDate: "2025-10-10",
    skipDate: "2025-10-07",
    notes: "Regular shift",
    storeId: "1",
  },
  {
    id: 2,
    startTime: "12:00",
    endTime: "20:00",
    shiftType: "Evening",
    startDate: "2025-10-06",
    endDate: "2025-10-12",
    skipDate: "",
    notes: "Extra shift",
    storeId: "2",
  },
  {
    id: 3,
    startTime: "22:00",
    endTime: "06:00",
    shiftType: "Night",
    startDate: "2025-10-07",
    endDate: "2025-10-15",
    skipDate: "2025-10-10",
    notes: "Night duty",
    storeId: "3",
  },
  {
    id: 4,
    startTime: "08:00",
    endTime: "16:00",
    shiftType: "Morning",
    startDate: "2025-10-08",
    endDate: "2025-10-14",
    skipDate: "",
    notes: "Store opening",
    storeId: "1",
  },
  {
    id: 5,
    startTime: "14:00",
    endTime: "22:00",
    shiftType: "Evening",
    startDate: "2025-10-09",
    endDate: "2025-10-17",
    skipDate: "",
    notes: "Late shift",
    storeId: "2",
  },
];

const index = () => {
  
    const userId = useAppSelector((state: any) => state?.auth?.account?.user?.id);
  
  const { data: shiftData } = useGetallshiftQuery({ UserId: userId });
  
  console.log("shiftData", shiftData);

  return (
    <CommisionContainer>
      <PageHeader
        title="Employee Calender"
        subtitle=""
        btntitle=""
        btntitle2=""
        icon={null}
        icon2={null}
        // onActionClick2={() => setLeaveRequests(true)}
      />
      <Grid container>
        <Grid size={12}>
          <CalendarView
            // shifts={sampleShifts.map((s) => ({
            //   id: s.id,
            //   title: s.shiftType,
            //   name: `Store ${s.storeId}`,
            //   start: new Date(s.startDate),
            //   end: new Date(s.endDate),
            //   startTime: s.startTime,
            //   endTime: s.endTime,
            //   location: `Store ${s.storeId}`,
            //   employeeId: s.storeId,
            // }))}
            shifts={shiftData?.items || []}
          />
        </Grid>
      </Grid>
    </CommisionContainer>
  );
};

export default index;
