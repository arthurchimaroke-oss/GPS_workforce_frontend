import { describe, expect, it } from "vitest";
import { normalizeAuthPayload, parseEntitySelectionRequired } from "@/lib/auth";

describe("parseEntitySelectionRequired", () => {
  it("unwraps the EntitySelectionRequired response envelope", () => {
    const payload = {
      EntitySelectionRequired: {
        user: {
          id: "6ba1d433-403a-4318-9fd2-37dee3dc6ce1",
          first_name: "Arthur",
          email: "arthurchimaroke@gmail.com",
        },
        company: {
          id: "54043a70-9a83-469d-9b3c-1b9f3fa46a6f",
          company_name: "Arthur Chimaroke",
          company_code: "Art--kGPpec",
        },
        entities: [
          { id: "d2abae74-b6a4-4bc6-8fbb-d87a5cedf159", name: "Omeenee ng" },
          { id: "3eae61e3-950b-435b-b64b-cb74e6d88151", name: "Omeenee ng" },
        ],
      },
    };

    expect(parseEntitySelectionRequired(payload)).toEqual(
      payload.EntitySelectionRequired,
    );
  });

  it("supports the legacy type field response shape", () => {
    const payload = {
      type: "EntitySelectionRequired",
      user: { id: "user-1", first_name: "Jane", email: "jane@example.com" },
      company: {
        id: "company-1",
        company_name: "Acme",
        company_code: "ACME",
      },
      entities: [{ id: "entity-1", name: "Main" }],
    };

    expect(parseEntitySelectionRequired(payload)).toEqual({
      user: payload.user,
      company: payload.company,
      entities: payload.entities,
    });
  });
});

describe("normalizeAuthPayload", () => {
  it("normalizes the login entity response into frontend auth state", () => {
    const payload = {
      LoginSuccess: {
        access_token: "access-token",
        refresh_token: "refresh-token",
        expires_at: 1755680000,
        user: {
          id: "user-1",
          first_name: "John",
          email: "john@example.com",
        },
        company: {
          id: "company-1",
          company_name: "GPS Technologies",
          company_code: "OME-67L5CK",
        },
        active_entity: {
          id: "entity-1",
          name: "Nigeria",
        },
      },
    };

    expect(normalizeAuthPayload(payload)).toEqual({
      token: "access-token",
      refreshToken: "refresh-token",
      expiresAt: 1755680000,
      user: {
        id: "user-1",
        first_name: "John",
        email: "john@example.com",
        company_id: "company-1",
        company_name: "GPS Technologies",
        company_code: "OME-67L5CK",
        active_entity_id: "entity-1",
        active_entity_name: "Nigeria",
        is_system_administrator: false,
        entities: [],
      },
      companyId: "company-1",
      companyName: "GPS Technologies",
      activeEntityId: "entity-1",
      activeEntityName: "Nigeria",
    });
  });
});
