import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  Modal,
  IconButton,
  useTheme,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Calendar: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // 🔹 Dummy static event data for UI
  const events = [
    {
      id: "1",
      title: "Lease 1 (Expiry)",
      start: "2025-10-15",
      backgroundColor: "red",
      textColor: "#fff",
      extendedProps: {
        name: "Lease 1",
        landlordName: "John Doe",
        leaseExpiry: "2025-10-15",
        renewalNoticeDate: "2025-09-30",
      },
    },
    {
      id: "2",
      title: "Lease 2 (Notice)",
      start: "2025-10-20",
      backgroundColor: "orange",
      textColor: "#fff",
      extendedProps: {
        name: "Lease 2",
        landlordName: "Jane Smith",
        leaseExpiry: "2025-11-01",
        renewalNoticeDate: "2025-10-20",
      },
    },
  ];

  const handleEventClick = (eventInfo: any) => {
    setSelectedEvent(eventInfo.event);
    setOpenModal(true);
  };

  const handleModalClose = () => setOpenModal(false);

  return (
    <Box
      sx={{
        height: "80vh",
        overflow: "auto",
        p: isMobile ? 1 : 2,
      }}
    >
      <FullCalendar
        height="100%"
        contentHeight="100%"
        aspectRatio={isMobile ? 0.75 : 1.35}
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "",
        }}
        events={events}
        eventClick={handleEventClick}
        eventContent={(eventInfo) => (
          <div
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
              fontSize: "0.85rem",
              color: eventInfo.event.textColor || "#000",
              backgroundColor:
                eventInfo.event.backgroundColor || "#FFFADF",
              padding: "2px 4px",
              borderRadius: "4px",
            }}
            title={eventInfo.event.title}
          >
            {eventInfo.event.title}
          </div>
        )}
      />

      {/* 🔹 Event Details Modal */}
      <Modal open={openModal} onClose={handleModalClose}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            minHeight: "100vh",
            pt: isMobile ? 6 : 8,
            px: 2,
          }}
        >
          <Card
            sx={{
              width: isMobile ? "100%" : 400,
              borderRadius: 2,
              boxShadow: 3,
              position: "relative",
              maxHeight: "80vh",
              overflowY: "auto",
              p: 2,
            }}
          >
            <IconButton
              onClick={handleModalClose}
              sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
            >
              <CloseIcon />
            </IconButton>

            <CardContent>
              <Typography variant="h6" gutterBottom>
                Event Details
              </Typography>
              {selectedEvent && (
                <>
                  <Typography variant="body2">
                    <strong>Name:</strong>{" "}
                    {selectedEvent.extendedProps?.name || "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Expiry Date:</strong>{" "}
                    {selectedEvent.extendedProps?.leaseExpiry || "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Landlord:</strong>{" "}
                    {selectedEvent.extendedProps?.landlordName || "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Renewal Notice Date:</strong>{" "}
                    {selectedEvent.extendedProps?.renewalNoticeDate || "N/A"}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </Box>
  );
};

export default Calendar;
