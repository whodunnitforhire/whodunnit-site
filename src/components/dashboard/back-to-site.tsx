import { Button, Loader } from "@mantine/core";
import { IconHome2 } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

function BackToSiteButton() {
  const [loading, setLoading] = useState(false);

  function leftSectionContent() {
    if (loading) {
      return <Loader size="xs" color="var(--mantine-color-text)" />;
    }
    return <IconHome2 size={16} />;
  }

  return (
    <Button
      component={Link}
      href="/"
      variant="default"
      leftSection={leftSectionContent()}
      onClick={() => setLoading(true)}
    >
      Back to site
    </Button>
  );
}

export default BackToSiteButton;
