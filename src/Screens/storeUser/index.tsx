import { Paper } from "@mui/material"
import AppPagination from "../../Component/AppPagination"
import CommonTable from "../../Component/CommenTable"
import PageHeader from "../../Component/commonPageHeader"
import CommisionContainer from "../../Component/container"
import { storeUserTableDataService } from "./Service/StoreUserTableDataService"


const index = () => {
    
    const { columns, rows } = storeUserTableDataService(dicData?.items);
  return (
    <div>
     <CommisionContainer>
        <PageHeader
          title="Store User"
          btntitle="Add Dictionary"
          onActionClick={() => setModalOpen(true)}
        />
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
        
          {/* <DictionaryFilter 
            queryParams={queryParams}
            onQueryParamsChange={handleQueryParamsChange}
            categories={categorys?.categories || []}/> */}

          <CommonTable
            columns={columns}
            rows={rows}
            actions={{
              onEdit: handleEdit,
              onDelete: handleDelete,
            }}
          />
          
          {dicData?.metaData && (
            <AppPagination
              metaData={dicData?.metaData}
              onPageChange={(page: number) =>
                setQueryParams({ ...queryParams, PageNumber: page })
              }
            />
          )}
        </Paper>
      </CommisionContainer>
    </div>
  )
}

export default index
