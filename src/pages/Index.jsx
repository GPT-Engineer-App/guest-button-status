import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Stack, Heading, Text, useToast, Editable, EditableInput, EditablePreview, IconButton, Flex } from "@chakra-ui/react";
import { FaPencilAlt, FaPlus, FaSave, FaUserPlus } from "react-icons/fa";

const Index = () => {
  const toast = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [guests, setGuests] = useState([]);
  const [newGuestName, setNewGuestName] = useState("");

  const handleLogin = () => {
    // Mock login functionality
    setIsLoggedIn(true);
  };

  const addGuest = () => {
    if (newGuestName.trim() === "") {
      toast({
        title: "Error",
        description: "Guest name cannot be empty.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Add the new guest to the list
    setGuests([...guests, { name: newGuestName, status: "Pending" }]);
    setNewGuestName(""); // Clear the input field
  };

  const updateGuestStatus = (index, status) => {
    // Update the status of the guest at the given index
    const updatedGuests = [...guests];
    updatedGuests[index].status = status;
    setGuests(updatedGuests);
  };

  if (!isLoggedIn) {
    return (
      <Box p={8}>
        <Heading mb={6}>Please log in</Heading>
        <Button onClick={handleLogin} colorScheme="blue">
          Log in
        </Button>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Heading mb={6}>Guest Management</Heading>
      <FormControl id="add-guest" mb={4}>
        <FormLabel>Add Guest</FormLabel>
        <Flex>
          <Input placeholder="Enter guest name" value={newGuestName} onChange={(e) => setNewGuestName(e.target.value)} mr={2} />
          <IconButton aria-label="Add guest" icon={<FaUserPlus />} onClick={addGuest} />
        </Flex>
      </FormControl>
      <Stack spacing={4}>
        {guests.map((guest, index) => (
          <Flex key={index} align="center">
            <Text flex={1}>{guest.name}</Text>
            <Editable defaultValue={guest.status} onSubmit={(newStatus) => updateGuestStatus(index, newStatus)} isPreviewFocusable={false}>
              <EditablePreview />
              <EditableInput />
              <IconButton size="sm" icon={<FaPencilAlt />} m={1} aria-label="Edit status" />
              <IconButton size="sm" icon={<FaSave />} m={1} aria-label="Save status" onClick={() => updateGuestStatus(index, guest.status)} />
            </Editable>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};

export default Index;
