"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Container, Stack, Button, Text } from "@mantine/core";

export default function UnauthorizedPage() {
  return (
    <Container mx="auto" mt={100}>
      <Stack gap="lg" justify="center" align="center">
        <Text>This page has restricted access.</Text>
        <LogoutLink postLogoutRedirectURL="/">
          <Button color="red">Logout</Button>
        </LogoutLink>
      </Stack>
    </Container>
  );
}