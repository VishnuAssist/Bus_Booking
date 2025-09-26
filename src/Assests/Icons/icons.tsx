
import {
  MultilineChart,
  
  CalendarMonth,
  NotificationsActive,Notifications,FileUpload,Download,Delete,Edit,Visibility,Add,Cancel,
  
} from "@mui/icons-material";
import type { SxProps, Theme } from "@mui/material";


{/*PagesZone*/}

export const DashboardIcon = (sx?: SxProps<Theme>) => <MultilineChart sx={{ ...sx }} />;
export const CalendarIcon = (sx?: SxProps<Theme>) => <CalendarMonth sx={{ ...sx }} />;




export const NotificationActiveIcon = (sx?: SxProps<Theme>) => <NotificationsActive sx={{ ...sx }} />;
export const NotificationInActiveIcon = (sx?: SxProps<Theme>) => <Notifications sx={{ ...sx }} />;


{/*ActionsZone*/}
export const UploadIcon = (sx?: SxProps<Theme>) => <FileUpload sx={{ ...sx }} />;
export const DownloadIcon = (sx?: SxProps<Theme>) => <Download sx={{ ...sx }} />;

export const DeleteIcon = (sx?: SxProps<Theme>) => <Delete sx={{ ...sx }} />;
export const EditIcon = (sx?: SxProps<Theme>) => <Edit sx={{ ...sx }} />;
export const ViewIcon = (sx?: SxProps<Theme>) => <Visibility sx={{ ...sx }} />;
export const AddIcon = (sx?: SxProps<Theme>) => <Add sx={{ ...sx }} />;

export const CancelIcon = (sx?: SxProps<Theme>) => <Cancel sx={{ ...sx }} />;

