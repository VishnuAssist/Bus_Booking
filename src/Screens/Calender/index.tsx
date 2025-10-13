import { Grid } from "@mui/material"
import PageHeader from "../../Component/commonPageHeader"
import Calendar from "./Calender"


const index = () => {
  return (
    <div>
             <PageHeader
                    title="Calender"
                    subtitle=""
                    btntitle=""
                    btntitle2=""
                    icon={null}
                    icon2={null}
                    // onActionClick2={() => setLeaveRequests(true)}
                />
                <Grid container>
                  <Grid size={12}>
                    <Calendar/>
                  </Grid>
                </Grid>
    </div>
  )
}

export default index
