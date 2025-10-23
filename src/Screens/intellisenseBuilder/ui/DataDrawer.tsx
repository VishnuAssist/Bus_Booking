import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Paper,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  ContentCopy as CopyIcon,
  Download as DownloadIcon,
  Check as CheckIcon,
} from "@mui/icons-material";

// Drawer type options
export type DrawerType = "json" | "api";

// Props interface for DataDrawer component
interface DataDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  type: DrawerType;
  title?: string;
  onCopy?: () => void;
  onDownload?: () => void;
  showActions?: boolean; // New prop to control action buttons visibility
}

const DataDrawer: React.FC<DataDrawerProps> = ({
  isOpen,
  onClose,
  data,
  type,
  title,
  onCopy,
  onDownload,
  showActions = true, // Default to true for backward compatibility
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  // Copy functionality
  const handleCopy = async (): Promise<void> => {
    try {
      const dataString =
        typeof data === "string" ? data : JSON.stringify(data, null, 2);
      await navigator.clipboard.writeText(dataString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      if (onCopy) onCopy();
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Download functionality
  const handleDownload = (): void => {
    const dataString =
      typeof data === "string" ? data : JSON.stringify(data, null, 2);
    const blob = new Blob([dataString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download =
      type === "json" ? "rule-engine-config.json" : "api-response.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    if (onDownload) onDownload();
  };

  // Determine icon and default title based on type
  const getDrawerConfig = (drawerType: DrawerType) => {
    switch (drawerType) {
      case "json":
        return {
          icon: "📄",
          defaultTitle: "JSON Preview",
          textColor: "#e5e5e5", // Static color for JSON
        };
      case "api":
        return {
          icon: "🚀",
          defaultTitle: "API Response",
          textColor: data?.error ? "#ff6b6b" : "#e5e5e5", // Conditional color for API
        };
      default:
        return {
          icon: "📄",
          defaultTitle: "Data Preview",
          textColor: "#e5e5e5",
        };
    }
  };

  const config = getDrawerConfig(type);
  const displayTitle = title || config.defaultTitle;

  return (
    <>
      <Drawer anchor="right" open={isOpen} onClose={onClose}>
        {/* Header */}
        <Box
          sx={{
            p: 2.5,
            borderBottom: "1px solid #333",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.125rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {config.icon} {displayTitle}
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              color: "#fff",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            ×
          </IconButton>
        </Box>

        {/* Actions */}
        {showActions && (
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid #333",
              display: "flex",
              gap: 1.5,
            }}
          >
            <Button
              variant="contained"
              startIcon={copied ? <CheckIcon /> : <CopyIcon />}
              onClick={handleCopy}
              sx={{
                backgroundColor: copied ? "#22c55e" : "#3b82f6",
                color: "white",
                fontSize: "0.875rem",
                fontWeight: 500,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: copied ? "#16a34a" : "#2563eb",
                },
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
              sx={{
                backgroundColor: "#8b5cf6",
                color: "white",
                fontSize: "0.875rem",
                fontWeight: 500,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#7c3aed",
                },
              }}
            >
              Download
            </Button>
          </Box>
        )}

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            p: 2.5,
            overflow: "auto",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              backgroundColor: "#0f0f0f",
              border: "1px solid #333",
              borderRadius: 1,
              p: 2,
            }}
          >
            <Box
              component="pre"
              sx={{
                color: config.textColor,
                fontSize: "0.75rem",
                lineHeight: 1.5,
                margin: 0,
                fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                overflow: "auto",
              }}
            >
              {typeof data === "string" ? data : JSON.stringify(data, null, 2)}
            </Box>
          </Paper>
        </Box>

        {/* Footer */}
        {showActions && type === "json" && (
          <Box
            sx={{
              p: 2,
              borderTop: "1px solid #333",
              color: "#888",
              fontSize: "0.75rem",
            }}
          >
            <Alert
              severity="info"
              sx={{
                backgroundColor: "transparent",
                color: "#888",
                fontSize: "0.75rem",
                "& .MuiAlert-icon": {
                  color: "#888",
                },
                "& .MuiAlert-message": {
                  fontSize: "0.75rem",
                },
              }}
            >
              💡 Tip: Copy the JSON to use in your rule engine
            </Alert>
          </Box>
        )}
      </Drawer>

      {/* Copy Success Snackbar */}
      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setCopied(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {type === "json"
            ? "JSON copied to clipboard!"
            : "Data copied to clipboard!"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DataDrawer;
