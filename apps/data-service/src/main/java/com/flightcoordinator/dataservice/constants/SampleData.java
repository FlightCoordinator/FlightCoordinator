package com.flightcoordinator.dataservice.constants;

import java.util.Arrays;
import java.util.List;

import com.flightcoordinator.dataservice.enums.AirportType;
import com.flightcoordinator.dataservice.enums.CertificationStatus;
import com.flightcoordinator.dataservice.enums.Certifier;
import com.flightcoordinator.dataservice.enums.CountryCode;
import com.flightcoordinator.dataservice.enums.CrewMemberRole;
import com.flightcoordinator.dataservice.enums.CrewMemberStatus;
import com.flightcoordinator.dataservice.enums.EngineType;
import com.flightcoordinator.dataservice.enums.NoiseCategory;
import com.flightcoordinator.dataservice.enums.PlaneStatus;
import com.flightcoordinator.dataservice.enums.RunwayStatus;
import com.flightcoordinator.dataservice.enums.SurfaceType;
import com.flightcoordinator.dataservice.enums.VisualApproachAid;

public class SampleData {
  public static class Flight {
    // assume 20

    public static List<Integer> samplepassengerCount = Arrays.asList(
        150, 200, 180, 220, 130, 250, 160, 170, 140, 210, 190, 175, 125, 230, 145, 155, 165, 135, 225, 115);

    public static List<Float> samplecargoWeight = Arrays.asList(
        5000.0F, 8000.0F, 6000.0F, 9000.0F, 4500.0F, 10000.0F, 5500.0F, 7000.0F, 4000.0F, 8500.0F, 7500.0F,
        6500.0F, 3000.0F, 9500.0F, 5000.0F, 6000.0F, 5500.0F, 4000.0F, 9000.0F, 2500.0F);

    public static List<Float> sampledistance = Arrays.asList(
        400.0F, 1200.0F, 900.0F, 2500.0F, 350.0F, 3000.0F, 700.0F, 1200.0F, 500.0F, 2500.0F, 1400.0F,
        800.0F, 300.0F, 2000.0F, 600.0F, 800.0F, 1000.0F, 450.0F, 2200.0F, 200.0F);
  }

  public static class Crew {
    // assume 20

    public static List<String> sampleFullName = Arrays.asList(
        "John Smith", "Alice Johnson", "Robert Brown", "Emily Davis", "Michael Wilson",
        "Sarah Martinez", "David Anderson", "Laura Thomas", "James White", "Emma Harris",
        "William Clark", "Olivia Lewis", "Benjamin Walker", "Sophia Hall", "Daniel Young",
        "Isabella Allen", "Matthew King", "Charlotte Wright", "Alexander Scott", "Mia Green");

    public static List<String> sampleEmail = Arrays.asList(
        "john.smith@example.com", "alice.johnson@example.com", "robert.brown@example.com",
        "emily.davis@example.com", "michael.wilson@example.com", "sarah.martinez@example.com",
        "david.anderson@example.com", "laura.thomas@example.com", "james.white@example.com",
        "emma.harris@example.com", "william.clark@example.com", "olivia.lewis@example.com",
        "benjamin.walker@example.com", "sophia.hall@example.com", "daniel.young@example.com",
        "isabella.allen@example.com", "matthew.king@example.com", "charlotte.wright@example.com",
        "alexander.scott@example.com", "mia.green@example.com");

    public static List<String> samplePhoneNumber = Arrays.asList(
        "+1-555-101-2020", "+1-555-202-3030", "+1-555-303-4040", "+1-555-404-5050", "+1-555-505-6060",
        "+1-555-606-7070", "+1-555-707-8080", "+1-555-808-9090", "+1-555-909-0000", "+1-555-000-1111",
        "+1-555-111-2222", "+1-555-222-3333", "+1-555-333-4444", "+1-555-444-5555", "+1-555-555-6666",
        "+1-555-666-7777", "+1-555-777-8888", "+1-555-888-9999", "+1-555-999-0001", "+1-555-000-1010");

    public static List<CrewMemberRole> sampleRole = Arrays.asList(
        CrewMemberRole.CAPTAIN, CrewMemberRole.CAPTAIN, CrewMemberRole.SECOND_OFFICER, CrewMemberRole.SECOND_OFFICER,
        CrewMemberRole.FLIGHT_ATTENDANT, CrewMemberRole.CABIN_SUPERVISOR, CrewMemberRole.FLIGHT_ATTENDANT,
        CrewMemberRole.CABIN_SUPERVISOR, CrewMemberRole.FLIGHT_ATTENDANT, CrewMemberRole.FLIGHT_ATTENDANT,
        CrewMemberRole.FLIGHT_ATTENDANT, CrewMemberRole.FLIGHT_ATTENDANT, CrewMemberRole.CABIN_SUPERVISOR,
        CrewMemberRole.FLIGHT_ATTENDANT, CrewMemberRole.PURSER, CrewMemberRole.FIRST_OFFICER,
        CrewMemberRole.FIRST_OFFICER, CrewMemberRole.PURSER, CrewMemberRole.CAPTAIN, CrewMemberRole.PURSER);

    public static List<Integer> sampleTotalFlightHours = Arrays.asList(
        12000, 15000, 8000, 7000, 5000, 4000, 4500, 6000, 5200, 4800,
        4700, 4300, 3900, 4100, 3000, 3200, 2900, 1500, 1800, 1600);

    public static List<CrewMemberStatus> sampleStatus = Arrays.asList(
        CrewMemberStatus.ACTIVE, CrewMemberStatus.ACTIVE, CrewMemberStatus.ACTIVE, CrewMemberStatus.ACTIVE,
        CrewMemberStatus.ACTIVE, CrewMemberStatus.ACTIVE, CrewMemberStatus.ACTIVE, CrewMemberStatus.ACTIVE,
        CrewMemberStatus.ON_LEAVE, CrewMemberStatus.ON_LEAVE, CrewMemberStatus.ACTIVE, CrewMemberStatus.ACTIVE,
        CrewMemberStatus.ACTIVE, CrewMemberStatus.ACTIVE, CrewMemberStatus.RETIRED, CrewMemberStatus.ACTIVE,
        CrewMemberStatus.ACTIVE, CrewMemberStatus.ACTIVE, CrewMemberStatus.ON_LEAVE, CrewMemberStatus.ACTIVE);
  }

  public static class Certification {
    // assume 40

    public static List<String> sampleName = Arrays.asList(
        "Commercial Pilot License", "Airline Transport Pilot License", "Flight Instructor Certificate",
        "Multi-Engine Rating", "Single Engine Rating", "Certified Flight Engineer License",
        "Flight Dispatcher License", "Type Rating A320", "Type Rating B737", "Type Rating B787",
        "Flight Attendant Certification", "Advanced Ground Instructor Certificate",
        "Aircraft Maintenance Engineer License", "Safety Management System Certification",
        "Human Factors in Aviation Certificate", "Aircraft Security Training", "Crew Resource Management Certification",
        "Turbine Engine Ground School", "First Aid and CPR Certification", "Flight Safety Management Certification",
        "Type Rating B757", "Type Rating B767", "Type Rating A330", "Type Rating A350", "Type Rating Embraer E190",
        "Type Rating Bombardier Q400", "Ground Handling Certificate", "Dangerous Goods Awareness Training",
        "Safety Equipment Training", "Advanced Rescue and Survival Training", "Aircraft Weight and Balance Training",
        "Performance-Based Navigation Training", "Emergency Evacuation Procedures Certification",
        "Aviation Security Awareness Training", "Cockpit Resource Management Certification",
        "Weather Radar Operations Certification", "Avionics Systems Certification", "Maintenance Management Training",
        "Flight Operations Safety Certification", "Human Factors in Maintenance Training");

    public static List<String> sampleCertificationNumber = Arrays.asList(
        "CPL12345", "ATPL67890", "FIC11122", "ME123456", "SE98765", "CFEL4321", "FD56789", "TR-A320-001",
        "TR-B737-002", "TR-B787-003", "FAC0001", "AGI1001", "AME1234", "SMS5678", "HFAC9876", "AST4567", "CRM1234",
        "TEG1001", "FACP123", "FSMC234", "TR-B757-004", "TR-B767-005", "TR-A330-006", "TR-A350-007", "TR-E190-008",
        "TR-Q400-009", "GHC1010", "DGA1111", "SET1212", "ARST1313", "AWBT1414", "PBN1515", "EEP1616", "ASAT1717",
        "CRM1818", "WROC1919", "ASC2020", "MMT2121", "FOSC2222", "HFM2323");

    public static List<Certifier> sampleIssuer = Arrays.asList(
        Certifier.FAA, Certifier.EASA, Certifier.CAA_UK, Certifier.CAA_NZ, Certifier.CAA_PK, Certifier.CAD_HK,
        Certifier.GCAA, Certifier.SACAA, Certifier.IATA, Certifier.FLIGHT_SAFETY, Certifier.ATRA, Certifier.LAT,
        Certifier.CAA_PH, Certifier.CAA_SG, Certifier.TRANSPORT_CANADA, Certifier.DGCA_TR, Certifier.DGCA_IN,
        Certifier.DGCA_ID, Certifier.DGCA_KW, Certifier.CAAC, Certifier.CASA, Certifier.ICAO, Certifier.ANAC,
        Certifier.GCAA, Certifier.SACAA, Certifier.IATA, Certifier.FLIGHT_SAFETY, Certifier.ATRA, Certifier.LAT,
        Certifier.CAE, Certifier.TRANSPORT_CANADA, Certifier.DGCA_ID, Certifier.FAA, Certifier.EASA, Certifier.CAA_UK,
        Certifier.CAA_NZ, Certifier.CAAC, Certifier.CASA, Certifier.DGCA_TR, Certifier.FLIGHT_SAFETY);

    public static List<String> sampleExpirationDate = Arrays.asList(
        "2028-05-10", "2026-11-20", "2028-07-15", "2027-03-30", "2027-08-25", "2026-01-12", "2029-09-10", "2028-05-22",
        "2028-10-05", "2027-02-15", "2029-06-30", "2028-04-11", "2027-12-01", "2026-09-22", "2027-03-15", "2027-06-18",
        "2028-02-28", "2028-08-20", "2026-04-16", "2027-12-31", "2029-03-01", "2028-05-15", "2026-07-20", "2028-01-10",
        "2027-11-18", "2027-05-05", "2029-07-12", "2026-08-14", "2028-10-01", "2028-12-20", "2027-11-01", "2026-03-05",
        "2027-09-15", "2028-06-12", "2028-01-30", "2029-05-25", "2026-02-14", "2027-08-10", "2028-03-22", "2028-04-25");

    public static List<Integer> sampleValidityPeriod = Arrays.asList(
        60, 120, 24, 36, 48, 24, 12, 12, 24, 36, 60, 48, 36, 12, 36, 24, 24, 12, 36, 24, 60, 48, 12,
        36, 24, 60, 24, 12, 36, 24, 60, 48, 12, 36, 24, 60, 36, 24, 12, 12);

    public static List<String> sampleDescription = Arrays.asList(
        "License to operate as a pilot.", "License required for airline transport.",
        "Certification for flight instructors.", "Certification for multi-engine aircraft.",
        "Certification for single-engine aircraft.", "License for flight engineers.",
        "Certification for flight dispatchers.", "Type rating for A320.", "Type rating for B737.",
        "Type rating for B787.", "Certification for flight attendants.",
        "Instructor certificate for advanced ground training.", "License for aircraft maintenance engineers.",
        "Certification for SMS implementation.", "Training for human factors in aviation.",
        "Training for aircraft security.", "Certification for crew resource management.",
        "Ground school for turbine engines.", "Certification for first aid and CPR.",
        "Training for flight safety management.", "Type rating for B757.", "Type rating for B767.",
        "Type rating for A330.", "Type rating for A350.", "Type rating for Embraer E190.",
        "Type rating for Bombardier Q400.", "Certification for ground handling.",
        "Training on dangerous goods awareness.", "Training for safety equipment use.",
        "Training for advanced rescue and survival.", "Training for aircraft weight and balance.",
        "Training for performance-based navigation.", "Certification for emergency evacuation procedures.",
        "Training for aviation security awareness.", "Certification for cockpit resource management.",
        "Certification for weather radar operations.", "Certification for avionics systems.",
        "Training for maintenance management.", "Certification for flight operations safety.",
        "Training for human factors in maintenance.");
  }

  public static class Airport {
    // Assume 20

    public static List<String> sampleAirportName = Arrays.asList(
        "Los Angeles International Airport",
        "John F. Kennedy International Airport",
        "London Heathrow Airport",
        "Tokyo Haneda Airport",
        "Dubai International Airport",
        "Frankfurt Airport",
        "Singapore Changi Airport",
        "Sydney Kingsford Smith Airport",
        "Charles de Gaulle Airport",
        "Amsterdam Schiphol Airport",
        "Hong Kong International Airport",
        "Zurich Airport",
        "Istanbul Airport",
        "San Francisco International Airport",
        "Denver International Airport",
        "Beijing Capital International Airport",
        "Toronto Pearson International Airport",
        "Incheon International Airport",
        "Munich Airport",
        "Miami International Airport");

    public static List<String> sampleIATACode = Arrays.asList(
        "LAX", "JFK", "LHR", "HND", "DXB", "FRA", "SIN", "SYD", "CDG", "AMS",
        "HKG", "ZRH", "IST", "SFO", "DEN", "PEK", "YYZ", "ICN", "MUC", "MIA");

    public static List<String> sampleICAOCode = Arrays.asList(
        "KLAX", "KJFK", "EGLL", "RJTT", "OMDB", "EDDF", "WSSS", "YSSY", "LFPG", "EHAM",
        "VHHH", "LSZH", "LTFJ", "KSFO", "KDEN", "ZBAA", "CYYZ", "RKSI", "EDDM", "KMIA");

    public static List<CountryCode> sampleCountryCode = Arrays.asList(
        CountryCode.US, CountryCode.US, CountryCode.GB, CountryCode.JP, CountryCode.AE,
        CountryCode.DE, CountryCode.SG, CountryCode.AU, CountryCode.FR, CountryCode.NL,
        CountryCode.HK, CountryCode.CH, CountryCode.TR, CountryCode.US, CountryCode.US,
        CountryCode.CN, CountryCode.CA, CountryCode.KR, CountryCode.DE, CountryCode.US);

    public static List<AirportType> sampleType = Arrays.asList(
        AirportType.INTERNATIONAL, AirportType.INTERNATIONAL, AirportType.INTERNATIONAL, AirportType.INTERNATIONAL,
        AirportType.INTERNATIONAL, AirportType.INTERNATIONAL, AirportType.INTERNATIONAL, AirportType.INTERNATIONAL,
        AirportType.INTERNATIONAL, AirportType.INTERNATIONAL, AirportType.INTERNATIONAL, AirportType.INTERNATIONAL,
        AirportType.INTERNATIONAL, AirportType.INTERNATIONAL, AirportType.INTERNATIONAL, AirportType.INTERNATIONAL,
        AirportType.INTERNATIONAL, AirportType.INTERNATIONAL, AirportType.INTERNATIONAL, AirportType.INTERNATIONAL);

    public static List<String> sampleOperationStartTime = Arrays.asList(
        "04:00", "05:00", "00:00", "00:00", "05:30", "04:30", "06:00", "05:00", "00:00", "04:30",
        "05:00", "00:00", "00:00", "04:30", "05:00", "00:00", "00:00", "05:30", "06:00", "06:00");

    public static List<String> sampleOperationStopTime = Arrays.asList(
        "23:59", "23:30", "23:59", "23:59", "23:59", "23:00", "23:00", "23:30", "23:59", "23:59",
        "23:59", "23:59", "23:59", "23:59", "23:30", "23:59", "23:59", "23:59", "23:30", "23:30");

    public static List<Float> sampleElevation = Arrays.asList(
        38.0F, 25.0F, 6.0F, 19.0F, 4.0F, 111.0F, 9.0F, 119.0F, 35.0F, 750.0F,
        173.0F, 1655.0F, 7.0F, 4.0F, 610.0F, 7.0F, 9.0F, 11.0F, 192.0F, 150.0F);

    public static List<Float> sampleSlope = Arrays.asList(
        0.2F, 0.1F, 0.05F, 0.07F, 0.09F, 0.15F, 0.1F, 0.12F, 0.08F, 0.2F,
        0.1F, 0.3F, 0.05F, 0.09F, 0.15F, 0.07F, 0.05F, 0.06F, 0.1F, 0.13F);

    public static List<NoiseCategory> samplePossibleNoiseCategory = Arrays.asList(
        NoiseCategory.CHAPTER_14, NoiseCategory.CHAPTER_14, NoiseCategory.CHAPTER_4, NoiseCategory.CHAPTER_14,
        NoiseCategory.CHAPTER_14, NoiseCategory.CHAPTER_4, NoiseCategory.CHAPTER_4, NoiseCategory.CHAPTER_4,
        NoiseCategory.CHAPTER_14, NoiseCategory.CHAPTER_14, NoiseCategory.CHAPTER_4, NoiseCategory.CHAPTER_3,
        NoiseCategory.CHAPTER_4, NoiseCategory.CHAPTER_14, NoiseCategory.CHAPTER_4, NoiseCategory.CHAPTER_4,
        NoiseCategory.CHAPTER_14, NoiseCategory.CHAPTER_14, NoiseCategory.CHAPTER_4, NoiseCategory.CHAPTER_2);
  }

  public static class Plane {
    // Assume 20

    public static List<String> sampleTailNumber = Arrays.asList(
        "N123AA", "N456BB", "N789CC", "N234DD", "N567EE", "N890FF", "N345GG", "N678HH", "N901II", "N012JJ",
        "N345KK", "N678LL", "N901MM", "N234NN", "N567OO", "N890PP", "N345QQ", "N678RR", "N901SS", "N012TT");

    public static List<String> sampleNextMaintenanceDate = Arrays.asList(
        "2040-06-15", "2038-11-20", "2042-03-30", "2035-07-10", "2045-09-25",
        "2041-12-12", "2039-05-15", "2043-08-05", "2046-01-22", "2036-04-18",
        "2044-10-10", "2040-07-05", "2037-09-30", "2042-02-25", "2043-06-17",
        "2038-11-29", "2045-10-20", "2039-03-10", "2046-12-05", "2041-01-15");

    public static List<Integer> sampleCyclesSinceLastMaintenance = Arrays.asList(
        2993, 293, 2155, 745, 1764, 2116, 336, 2470, 864, 466, 1661, 362, 914, 2794, 548, 2735, 2747, 980, 2364, 1094);

    public static List<String> sampleRetirementDate = Arrays.asList(
        "2026-01-15", "2026-02-22", "2026-03-30", "2026-04-05", "2026-05-12",
        "2026-06-18", "2026-07-25", "2026-08-10", "2026-09-15", "2026-10-20",
        "2026-11-11", "2026-12-01", "2027-01-22", "2027-02-10", "2027-03-05",
        "2027-04-15", "2027-05-30", "2027-06-18", "2027-07-20", "2027-08-25");

    public static List<Float> sampleEngineHours = Arrays.asList(
        2400.5F, 3600.0F, 1800.75F, 5000.2F, 1100.4F, 2800.6F, 4300.9F, 4900.1F, 5300.8F, 1700.3F,
        3900.5F, 2700.7F, 4600.2F, 3100.9F, 3500.0F, 2200.8F, 3300.4F, 4200.6F, 4700.1F, 2550.7F);

    public static List<Float> sampleWearLevel = Arrays.asList(
        10.5F, 25.0F, 5.0F, 40.0F, 3.5F, 15.0F, 30.0F, 50.0F, 60.0F, 8.0F,
        20.5F, 12.7F, 35.0F, 18.0F, 27.0F, 7.2F, 22.8F, 38.9F, 45.3F, 13.5F);

    public static List<Float> sampleTotalFlightHours = Arrays.asList(
        10000.5F, 15000.0F, 7500.75F, 20000.2F, 5000.4F, 12000.6F, 17500.9F, 19000.1F, 21000.8F, 8500.3F,
        16500.5F, 11500.7F, 18000.2F, 13000.9F, 14000.0F, 11000.8F, 15500.4F, 17000.6F, 18500.1F, 12750.7F);

    public static List<Float> sampleFuelAmount = Arrays.asList(
        5000.0F, 2000.0F, 10000.0F, 3500.0F, 1500.0F, 7500.0F, 3000.0F, 9000.0F, 4500.0F, 1200.0F,
        6500.0F, 2800.0F, 8500.0F, 3800.0F, 4800.0F, 5600.0F, 2300.0F, 7800.0F, 8900.0F, 4100.0F);

    public static List<PlaneStatus> samplePlaneStatus = Arrays.asList(
        PlaneStatus.ACTIVE, PlaneStatus.UNDER_MAINTENANCE, PlaneStatus.ACTIVE, PlaneStatus.RETIRED, PlaneStatus.ACTIVE,
        PlaneStatus.UNDER_MAINTENANCE, PlaneStatus.ACTIVE, PlaneStatus.ACTIVE, PlaneStatus.ACTIVE, PlaneStatus.INACTIVE,
        PlaneStatus.ACTIVE, PlaneStatus.ACTIVE, PlaneStatus.ACTIVE, PlaneStatus.UNDER_MAINTENANCE, PlaneStatus.ACTIVE,
        PlaneStatus.ACTIVE, PlaneStatus.ACTIVE, PlaneStatus.ACTIVE, PlaneStatus.ACTIVE, PlaneStatus.INACTIVE);

    public static List<String> sampleAircraftOperator = Arrays.asList(
        "Delta Air Lines", "American Airlines", "United Airlines", "Lufthansa", "British Airways",
        "Emirates", "Qatar Airways", "Air France", "KLM", "Turkish Airlines", "Singapore Airlines",
        "Cathay Pacific", "ANA", "JAL", "Iberia", "Etihad Airways", "Qantas", "Alaska Airlines",
        "JetBlue", "Southwest Airlines");
  }

  public static class Model {
    // Assume 20

    public static List<String> sampleManufacturer = Arrays.asList(
        "Boeing", "Airbus", "Boeing", "Airbus", "Embraer", "Bombardier", "Boeing", "Airbus", "ATR", "Boeing",
        "Airbus", "Cessna", "Embraer", "Boeing", "Airbus", "Bombardier", "Boeing", "Airbus", "Boeing", "Airbus");

    public static List<String> samplePlaneIdentifier = Arrays.asList(
        "B737-800", "A320", "B777-300ER", "A350-900", "E190", "CRJ900", "B787-9", "A220", "ATR72", "B747-8",
        "A321XLR", "C208", "E175", "B767-300", "A330-300", "CRJ700", "B757-200", "A340-600", "B737-MAX", "A380");

    public static List<String> sampleModelName = Arrays.asList(
        "737-800", "A320", "777-300ER", "A350-900", "E190", "CRJ900", "787-9", "A220", "ATR72", "747-8",
        "A321XLR", "C208", "E175", "767-300", "A330-300", "CRJ700", "757-200", "A340-600", "737-MAX", "A380");

    public static List<Certifier> sampleCertifier = Arrays.asList(
        Certifier.FAA, Certifier.EASA, Certifier.FAA, Certifier.EASA, Certifier.ANAC, Certifier.TRANSPORT_CANADA,
        Certifier.FAA, Certifier.EASA, Certifier.EASA, Certifier.FAA, Certifier.EASA, Certifier.FAA, Certifier.ANAC,
        Certifier.FAA, Certifier.EASA, Certifier.TRANSPORT_CANADA, Certifier.FAA, Certifier.EASA, Certifier.FAA,
        Certifier.EASA);

    public static List<CertificationStatus> sampleCertificationStatus = Arrays.asList(
        CertificationStatus.CERTIFIED, CertificationStatus.CERTIFIED, CertificationStatus.CERTIFIED,
        CertificationStatus.CERTIFIED, CertificationStatus.CERTIFIED, CertificationStatus.CERTIFIED,
        CertificationStatus.CERTIFIED, CertificationStatus.CERTIFIED, CertificationStatus.CERTIFIED,
        CertificationStatus.CERTIFIED, CertificationStatus.CERTIFIED, CertificationStatus.CERTIFIED,
        CertificationStatus.CERTIFIED, CertificationStatus.CERTIFIED, CertificationStatus.CERTIFIED,
        CertificationStatus.CERTIFIED, CertificationStatus.CERTIFIED, CertificationStatus.CERTIFIED,
        CertificationStatus.CERTIFIED, CertificationStatus.CERTIFIED);

    public static List<NoiseCategory> sampleNoiseCategory = Arrays.asList(
        NoiseCategory.CHAPTER_4, NoiseCategory.CHAPTER_3, NoiseCategory.CHAPTER_14, NoiseCategory.CHAPTER_3,
        NoiseCategory.CHAPTER_3, NoiseCategory.CHAPTER_4, NoiseCategory.CHAPTER_3, NoiseCategory.CHAPTER_3,
        NoiseCategory.CHAPTER_3, NoiseCategory.CHAPTER_14, NoiseCategory.CHAPTER_3, NoiseCategory.CHAPTER_3,
        NoiseCategory.CHAPTER_3, NoiseCategory.CHAPTER_4, NoiseCategory.CHAPTER_3, NoiseCategory.CHAPTER_4,
        NoiseCategory.CHAPTER_4, NoiseCategory.CHAPTER_14, NoiseCategory.CHAPTER_4, NoiseCategory.CHAPTER_14);

    public static List<Float> sampleFuelCapacity = Arrays.asList(
        26000.0F, 23850.0F, 181000.0F, 141000.0F, 13000.0F, 8800.0F, 138700.0F, 21000.0F, 10800.0F, 242470.0F,
        32400.0F, 1300.0F, 13500.0F, 91140.0F, 97000.0F, 6800.0F, 43200.0F, 204000.0F, 26000.0F, 320000.0F);

    public static List<Float> sampleFuelEfficiency = Arrays.asList(
        0.03F, 0.025F, 0.027F, 0.022F, 0.035F, 0.04F, 0.021F, 0.024F, 0.045F, 0.02F,
        0.023F, 0.055F, 0.035F, 0.026F, 0.028F, 0.042F, 0.033F, 0.019F, 0.032F, 0.018F);

    public static List<Integer> samplePassengerCapacity = Arrays.asList(
        189, 180, 396, 325, 114, 90, 296, 140, 78, 467, 244, 14, 88, 290, 277, 70, 239, 370, 210, 850);

    public static List<Float> sampleMaxCargoCapacity = Arrays.asList(
        20.0F, 18.0F, 50.0F, 45.0F, 10.0F, 8.0F, 48.0F, 15.0F, 9.0F, 60.0F,
        22.0F, 2.5F, 9.0F, 40.0F, 42.0F, 7.0F, 38.0F, 55.0F, 21.0F, 80.0F);

    public static List<Float> sampleEmptyWeight = Arrays.asList(
        41413.0F, 42600.0F, 168560.0F, 145150.0F, 28615.0F, 21100.0F, 128800.0F, 37200.0F, 13100.0F, 213200.0F,
        48500.0F, 2750.0F, 21000.0F, 90640.0F, 121000.0F, 18700.0F, 59000.0F, 175000.0F, 45000.0F, 277000.0F);

    public static List<Float> sampleTailHeight = Arrays.asList(
        12.6F, 11.8F, 18.5F, 17.1F, 10.6F, 7.5F, 16.9F, 11.5F, 8.3F, 19.4F,
        12.3F, 4.2F, 9.3F, 15.8F, 17.3F, 6.8F, 13.6F, 18.8F, 12.0F, 24.1F);

    public static List<Float> sampleWingspan = Arrays.asList(
        34.3F, 35.8F, 64.8F, 64.7F, 28.7F, 24.8F, 60.1F, 35.1F, 27.0F, 68.4F,
        35.7F, 15.9F, 26.0F, 47.6F, 60.3F, 24.5F, 38.0F, 63.5F, 34.0F, 79.8F);

    public static List<EngineType> sampleEngineType = Arrays.asList(
        EngineType.TURBOFAN, EngineType.TURBOFAN, EngineType.TURBOFAN, EngineType.TURBOFAN, EngineType.TURBOFAN,
        EngineType.TURBOFAN, EngineType.TURBOFAN, EngineType.TURBOFAN, EngineType.TURBOPROP, EngineType.TURBOFAN,
        EngineType.TURBOFAN, EngineType.TURBOPROP, EngineType.TURBOFAN, EngineType.TURBOFAN, EngineType.TURBOFAN,
        EngineType.TURBOFAN, EngineType.TURBOFAN, EngineType.TURBOFAN, EngineType.TURBOFAN, EngineType.TURBOFAN);

    public static List<Integer> sampleEngineCount = Arrays.asList(
        2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 1, 2, 2, 2, 2, 2, 4, 2, 4);

    public static List<Float> sampleThrustPerEngine = Arrays.asList(
        120.0F, 90.0F, 330.0F, 400.0F, 95.0F, 85.0F, 240.0F, 100.0F, 75.0F, 400.0F,
        240.0F, 30.0F, 90.0F, 180.0F, 200.0F, 80.0F, 130.0F, 320.0F, 200.0F, 350.0F);

    public static List<Float> sampleMaxCrosswindComp = Arrays.asList(
        38.0F, 36.0F, 40.0F, 38.0F, 35.0F, 30.0F, 37.0F, 32.0F, 33.0F, 41.0F,
        39.0F, 28.0F, 30.0F, 35.0F, 34.0F, 29.0F, 36.0F, 42.0F, 31.0F, 40.0F);

    public static List<Float> sampleRequiredRunwayLength = Arrays.asList(
        2800.0F, 3000.0F, 3500.0F, 3400.0F, 2300.0F, 2000.0F, 3100.0F, 2700.0F, 2200.0F, 4000.0F,
        2900.0F, 1500.0F, 2500.0F, 3000.0F, 3100.0F, 1800.0F, 2800.0F, 3200F, 2000.0F, 3100.0F);

    public static List<Float> sampleRequiredRunwayWidth = Arrays.asList(
        45.0F, 45.0F, 60.0F, 50.0F, 30.0F, 25.0F, 50.0F, 40.0F, 35.0F, 60.0F,
        45.0F, 25.0F, 30.0F, 50.0F, 55.0F, 40.0F, 40.0F, 60.0F, 35.0F, 65.0F);

    public static List<Float> sampleMinRotationRadius = Arrays.asList(
        15.0F, 16.0F, 20.0F, 18.0F, 12.0F, 10.0F, 18.0F, 14.0F, 11.0F, 22.0F,
        17.0F, 9.0F, 12.0F, 19.0F, 21.0F, 15.0F, 15.0F, 23.0F, 13.0F, 24.0F);

    public static List<Float> sampleCruiseSpeed = Arrays.asList(
        780.0F, 840.0F, 900.0F, 850.0F, 750.0F, 700.0F, 800.0F, 760.0F, 720.0F, 950.0F,
        800.0F, 600.0F, 700.0F, 860.0F, 900.0F, 750.0F, 720.0F, 840.0F, 800.0F, 880.0F);

    public static List<Float> sampleMaxSpeed = Arrays.asList(
        850.0F, 880.0F, 940.0F, 920.0F, 800.0F, 740.0F, 870.0F, 800.0F, 760.0F, 960.0F,
        850.0F, 600.0F, 740.0F, 900.0F, 950.0F, 790.0F, 760.0F, 880.0F, 840.0F, 920.0F);

    public static List<Float> sampleStallSpeed = Arrays.asList(
        130.0F, 120.0F, 140.0F, 135.0F, 110.0F, 100.0F, 125.0F, 115.0F, 105.0F, 145.0F,
        130.0F, 85.0F, 90.0F, 150.0F, 155.0F, 105.0F, 100.0F, 160.0F, 120.0F, 170.0F);

    public static List<Float> sampleMaxAltitude = Arrays.asList(
        35000.0F, 38000.0F, 43000.0F, 41000.0F, 33000.0F, 32000.0F, 39000.0F, 36000.0F, 34000.0F, 45000.0F,
        35000.0F, 25000.0F, 30000.0F, 40000.0F, 42000.0F, 33000.0F, 31000.0F, 44000.0F, 37000.0F, 46000.0F);

    public static List<Float> sampleClimbRate = Arrays.asList(
        3000.0F, 2500.0F, 3200.0F, 2800.0F, 2500.0F, 2000.0F, 2800.0F, 2900.0F, 2400.0F, 3500.0F,
        3100.0F, 1500.0F, 2200.0F, 3300.0F, 3400.0F, 2600.0F, 2400.0F, 3700.0F, 2800.0F, 3600.0F);

    public static List<Float> sampleDescentRate = Arrays.asList(
        3000.0F, 2500.0F, 2000.0F, 2200.0F, 2800.0F, 2300.0F, 2400.0F, 2700.0F, 2500.0F, 3100.0F,
        2900.0F, 1800.0F, 2600.0F, 3300.0F, 3200.0F, 2100.0F, 2200.0F, 3300.0F, 2800.0F, 3400.0F);

    public static List<Float> sampleMaxFlightRange = Arrays.asList(
        5600.0F, 6100.0F, 8500.0F, 7800.0F, 2900.0F, 3000.0F, 8000.0F, 3500.0F, 2400.0F, 9500.0F,
        5500.0F, 1000.0F, 2900.0F, 7600.0F, 8200.0F, 1800.0F, 6400.0F, 8000.0F, 5700.0F, 9000.0F);

    public static List<Boolean> sampleHasWeatherRadar = Arrays.asList(
        true, true, true, true, false, false, true, true, false, true,
        true, false, false, true, true, false, true, true, true, true);

    public static List<Boolean> sampleHasAutopilot = Arrays.asList(
        true, true, true, true, false, true, true, true, true, true,
        true, false, true, true, true, true, true, true, true, true);

    public static List<Boolean> sampleHasFlyByWire = Arrays.asList(
        true, true, true, true, false, false, true, true, true, true,
        true, false, false, true, true, false, true, true, true, true);

    public static List<Boolean> sampleHasFireSupression = Arrays.asList(
        true, true, true, true, false, true, true, true, true, false,
        true, false, true, true, true, false, true, true, true, true);

    public static List<Boolean> sampleGpsEnabled = Arrays.asList(
        true, true, true, true, false, false, true, true, true, true,
        true, false, true, true, true, false, true, true, true, true);
  }

  public static class Runway {
    // Assume 40

    public static List<String> sampleRunwayNumber = Arrays.asList(
        "09L", "09R", "27L", "27R", "18", "36", "05L", "05R", "23L", "23R",
        "15L", "15R", "33L", "33R", "12", "30", "08L", "08R", "26L", "26R",
        "10L", "10R", "28L", "28R", "17", "35", "06L", "06R", "24L", "24R",
        "14L", "14R", "32L", "32R", "11", "29", "07L", "07R", "25L", "25R");

    public static List<Float> sampleLength = Arrays.asList(
        3800.0F, 3800.0F, 3500.0F, 3500.0F, 3200.0F, 3100.0F, 4000.0F, 4000.0F, 3300.0F, 3300.0F,
        3700.0F, 3700.0F, 2900.0F, 2900.0F, 2700.0F, 2500.0F, 4100.0F, 4100.0F, 3600.0F, 3600.0F,
        3700.0F, 3700.0F, 3400.0F, 3400.0F, 3100.0F, 3000.0F, 4100.0F, 4100.0F, 3200.0F, 3200.0F,
        3600.0F, 3600.0F, 2800.0F, 2800.0F, 2600.0F, 2400.0F, 4200.0F, 4200.0F, 3500.0F, 3500.0F);

    public static List<Float> sampleWidth = Arrays.asList(
        45.0F, 45.0F, 60.0F, 60.0F, 45.0F, 45.0F, 60.0F, 60.0F, 45.0F, 45.0F,
        60.0F, 60.0F, 45.0F, 45.0F, 40.0F, 35.0F, 60.0F, 60.0F, 50.0F, 50.0F,
        50.0F, 50.0F, 55.0F, 55.0F, 45.0F, 45.0F, 60.0F, 60.0F, 40.0F, 40.0F,
        55.0F, 55.0F, 45.0F, 45.0F, 35.0F, 30.0F, 65.0F, 65.0F, 55.0F, 55.0F);

    public static List<SurfaceType> sampleSurfaceType = Arrays.asList(
        SurfaceType.ASPHALT, SurfaceType.ASPHALT, SurfaceType.CONCRETE, SurfaceType.CONCRETE, SurfaceType.ASPHALT,
        SurfaceType.ASPHALT, SurfaceType.CONCRETE, SurfaceType.CONCRETE, SurfaceType.ASPHALT, SurfaceType.ASPHALT,
        SurfaceType.CONCRETE, SurfaceType.CONCRETE, SurfaceType.ASPHALT, SurfaceType.ASPHALT, SurfaceType.GRAVEL,
        SurfaceType.GRAVEL, SurfaceType.CONCRETE, SurfaceType.CONCRETE, SurfaceType.ASPHALT, SurfaceType.ASPHALT,
        SurfaceType.CONCRETE, SurfaceType.CONCRETE, SurfaceType.ASPHALT, SurfaceType.ASPHALT, SurfaceType.CONCRETE,
        SurfaceType.CONCRETE, SurfaceType.ASPHALT, SurfaceType.ASPHALT, SurfaceType.CONCRETE, SurfaceType.CONCRETE,
        SurfaceType.ASPHALT, SurfaceType.ASPHALT, SurfaceType.GRAVEL, SurfaceType.GRAVEL, SurfaceType.GRASS,
        SurfaceType.GRASS, SurfaceType.CONCRETE, SurfaceType.CONCRETE, SurfaceType.ASPHALT, SurfaceType.ASPHALT);

    public static List<Float> sampleMaxWeightCapacity = Arrays.asList(
        500000.0F, 500000.0F, 600000.0F, 600000.0F, 400000.0F, 380000.0F, 700000.0F, 700000.0F, 450000.0F, 450000.0F,
        550000.0F, 550000.0F, 350000.0F, 350000.0F, 300000.0F, 250000.0F, 750000.0F, 750000.0F, 500000.0F, 500000.0F,
        550000.0F, 550000.0F, 580000.0F, 580000.0F, 390000.0F, 370000.0F, 710000.0F, 710000.0F, 440000.0F, 440000.0F,
        530000.0F, 530000.0F, 340000.0F, 340000.0F, 290000.0F, 240000.0F, 760000.0F, 760000.0F, 490000.0F, 490000.0F);

    public static List<Boolean> sampleHasMarking = Arrays.asList(
        true, true, true, true, true, true, true, true, true, true,
        true, true, false, false, false, false, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true, true,
        true, false, false, false, false, true, true, true, true);

    public static List<Boolean> sampleHasLighting = Arrays.asList(
        true, true, true, true, true, true, true, true, true, true,
        true, true, false, false, false, false, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true,
        true, true, false, false, false, false, true, true, true, true);

    public static List<Boolean> sampleHasILS = Arrays.asList(
        true, true, true, true, true, false, true, true, false, false,
        true, true, false, false, false, false, true, true, true, true,
        true, true, true, true, true, false, true, true, false, false,
        true, true, false, false, false, false, true, true, true, true);

    public static List<Boolean> sampleHasSafetyArea = Arrays.asList(
        true, true, true, true, true, true, true, true, true, true,
        true, true, false, false, false, false, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true,
        true, true, false, false, false, false, true, true, true, true);

    public static List<VisualApproachAid> sampleVisualApproachAid = Arrays.asList(
        VisualApproachAid.PAPI, VisualApproachAid.PAPI, VisualApproachAid.VASI, VisualApproachAid.VASI,
        VisualApproachAid.PAPI, VisualApproachAid.PAPI, VisualApproachAid.VASI, VisualApproachAid.VASI,
        VisualApproachAid.PAPI, VisualApproachAid.PAPI, VisualApproachAid.VASI, VisualApproachAid.VASI,
        VisualApproachAid.NONE, VisualApproachAid.NONE, VisualApproachAid.NONE, VisualApproachAid.NONE,
        VisualApproachAid.VASI, VisualApproachAid.VASI, VisualApproachAid.PAPI, VisualApproachAid.PAPI,
        VisualApproachAid.PAPI, VisualApproachAid.PAPI, VisualApproachAid.VASI, VisualApproachAid.VASI,
        VisualApproachAid.PAPI, VisualApproachAid.PAPI, VisualApproachAid.VASI, VisualApproachAid.VASI,
        VisualApproachAid.PAPI, VisualApproachAid.PAPI, VisualApproachAid.VASI, VisualApproachAid.VASI,
        VisualApproachAid.NONE, VisualApproachAid.NONE, VisualApproachAid.NONE, VisualApproachAid.NONE,
        VisualApproachAid.VASI, VisualApproachAid.VASI, VisualApproachAid.PAPI, VisualApproachAid.PAPI);

    public static List<Float> sampleAltitude = Arrays.asList(
        10.0F, 10.0F, 15.0F, 15.0F, 20.0F, 25.0F, 5.0F, 5.0F, 30.0F, 30.0F,
        18.0F, 18.0F, 50.0F, 50.0F, 70.0F, 80.0F, 8.0F, 8.0F, 12.0F, 12.0F,
        12.0F, 12.0F, 17.0F, 17.0F, 22.0F, 27.0F, 6.0F, 6.0F, 32.0F, 32.0F,
        19.0F, 19.0F, 55.0F, 55.0F, 75.0F, 85.0F, 9.0F, 9.0F, 14.0F, 14.0F);

    public static List<RunwayStatus> sampleRunwayStatus = Arrays.asList(
        RunwayStatus.OPEN, RunwayStatus.OPEN, RunwayStatus.OPEN, RunwayStatus.OPEN, RunwayStatus.OPEN,
        RunwayStatus.OPEN, RunwayStatus.OPEN, RunwayStatus.OPEN, RunwayStatus.OPEN, RunwayStatus.OPEN,
        RunwayStatus.OPEN, RunwayStatus.OPEN, RunwayStatus.CLOSED, RunwayStatus.CLOSED, RunwayStatus.CLOSED,
        RunwayStatus.CLOSED, RunwayStatus.OPEN, RunwayStatus.OPEN, RunwayStatus.OPEN, RunwayStatus.OPEN,
        RunwayStatus.OPEN, RunwayStatus.OPEN, RunwayStatus.OPEN, RunwayStatus.OPEN, RunwayStatus.OPEN,
        RunwayStatus.OPEN, RunwayStatus.OPEN, RunwayStatus.OPEN, RunwayStatus.OPEN, RunwayStatus.OPEN,
        RunwayStatus.OPEN, RunwayStatus.OPEN, RunwayStatus.CLOSED, RunwayStatus.CLOSED, RunwayStatus.CLOSED,
        RunwayStatus.CLOSED, RunwayStatus.OPEN, RunwayStatus.OPEN, RunwayStatus.OPEN, RunwayStatus.OPEN);

    public static List<Float> sampleCrosswindLimit = Arrays.asList(
        25.0F, 25.0F, 30.0F, 30.0F, 20.0F, 18.0F, 35.0F, 35.0F, 22.0F, 22.0F,
        28.0F, 28.0F, 15.0F, 15.0F, 12.0F, 10.0F, 40.0F, 40.0F, 27.0F, 27.0F,
        28.0F, 28.0F, 33.0F, 33.0F, 22.0F, 20.0F, 38.0F, 38.0F, 24.0F, 24.0F,
        30.0F, 30.0F, 16.0F, 16.0F, 13.0F, 11.0F, 42.0F, 42.0F, 29.0F, 29.0F);
  }

  public static class Taxiway {
    // Assume 50

    public static List<String> sampleName = Arrays.asList(
        "Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel", "India", "Juliet",
        "Kilo", "Lima", "Mike", "November", "Oscar", "Papa", "Quebec", "Romeo", "Sierra", "Tango",
        "Uniform", "Victor", "Whiskey", "X-ray", "Yankee", "Zulu", "Echo 1", "Echo 2", "Sierra 1",
        "Sierra 2", "Foxtrot 1", "Foxtrot 2", "Juliet 1", "Juliet 2", "Charlie 1", "Charlie 2", "Alpha 1",
        "Alpha 2", "Bravo 1", "Bravo 2", "Zulu 1", "Zulu 2", "Romeo 1", "Romeo 2", "Lima 1", "Lima 2",
        "Kilo 1", "Kilo 2", "India 1", "India 2");

    public static List<Float> sampleLoadCapacity = Arrays.asList(
        350000.0F, 400000.0F, 380000.0F, 360000.0F, 450000.0F, 420000.0F, 430000.0F, 410000.0F, 390000.0F, 370000.0F,
        340000.0F, 330000.0F, 320000.0F, 310000.0F, 300000.0F, 290000.0F, 280000.0F, 270000.0F, 260000.0F, 250000.0F,
        480000.0F, 460000.0F, 440000.0F, 420000.0F, 400000.0F, 380000.0F, 370000.0F, 360000.0F, 350000.0F, 340000.0F,
        330000.0F, 320000.0F, 310000.0F, 300000.0F, 290000.0F, 280000.0F, 270000.0F, 260000.0F, 250000.0F, 240000.0F,
        230000.0F, 220000.0F, 210000.0F, 200000.0F, 190000.0F, 180000.0F, 170000.0F, 160000.0F, 150000.0F, 140000.0F);

    public static List<Boolean> sampleHasHoldingPoint = Arrays.asList(
        true, true, false, false, true, true, false, false, true, true,
        false, false, true, true, false, false, true, true, false, false,
        true, true, false, false, true, true, false, false, true, true,
        false, false, true, true, false, false, true, true, false, false,
        true, true, false, false, true, true, false, false, true, true);

    public static List<Boolean> sampleHasHighSpeedExit = Arrays.asList(
        true, false, true, false, true, false, true, false, true, false,
        true, false, true, false, true, false, true, false, true, false,
        true, false, true, false, true, false, true, false, true, false,
        true, false, true, false, true, false, true, false, true, false,
        true, false, true, false, true, false, true, false, true, false);

    public static List<Float> sampleWidth = Arrays.asList(
        25.0F, 30.0F, 20.0F, 22.0F, 26.0F, 28.0F, 24.0F, 30.0F, 29.0F, 31.0F,
        27.0F, 22.0F, 20.0F, 23.0F, 25.0F, 26.0F, 30.0F, 32.0F, 34.0F, 36.0F,
        28.0F, 27.0F, 22.0F, 20.0F, 21.0F, 23.0F, 25.0F, 29.0F, 31.0F, 35.0F,
        38.0F, 40.0F, 42.0F, 44.0F, 46.0F, 48.0F, 50.0F, 52.0F, 54.0F, 56.0F,
        58.0F, 60.0F, 62.0F, 64.0F, 66.0F, 68.0F, 70.0F, 72.0F, 74.0F, 76.0F);

    public static List<Float> sampleLength = Arrays.asList(
        300.0F, 350.0F, 320.0F, 310.0F, 340.0F, 330.0F, 360.0F, 380.0F, 390.0F, 400.0F,
        250.0F, 240.0F, 230.0F, 220.0F, 210.0F, 200.0F, 180.0F, 170.0F, 160.0F, 150.0F,
        140.0F, 130.0F, 120.0F, 110.0F, 100.0F, 90.0F, 80.0F, 70.0F, 60.0F, 50.0F,
        400.0F, 420.0F, 440.0F, 460.0F, 480.0F, 500.0F, 520.0F, 540.0F, 560.0F, 580.0F,
        600.0F, 620.0F, 640.0F, 660.0F, 680.0F, 700.0F, 720.0F, 740.0F, 760.0F, 780.0F);

    public static List<Float> sampleMaxTurningRadius = Arrays.asList(
        50.0F, 55.0F, 60.0F, 65.0F, 70.0F, 75.0F, 80.0F, 85.0F, 90.0F, 95.0F,
        40.0F, 45.0F, 35.0F, 30.0F, 25.0F, 20.0F, 15.0F, 10.0F, 5.0F, 55.0F,
        60.0F, 65.0F, 70.0F, 75.0F, 80.0F, 45.0F, 50.0F, 55.0F, 60.0F, 65.0F,
        30.0F, 25.0F, 20.0F, 15.0F, 10.0F, 40.0F, 35.0F, 30.0F, 25.0F, 20.0F,
        10.0F, 5.0F, 50.0F, 55.0F, 60.0F, 65.0F, 70.0F, 75.0F, 80.0F, 85.0F);

    public static List<Float> sampleMaxWeightCapacity = Arrays.asList(
        80000.0F, 90000.0F, 70000.0F, 75000.0F, 85000.0F, 95000.0F, 100000.0F, 90000.0F, 80000.0F, 70000.0F,
        60000.0F, 50000.0F, 55000.0F, 60000.0F, 65000.0F, 70000.0F, 75000.0F, 80000.0F, 85000.0F, 90000.0F,
        100000.0F, 90000.0F, 80000.0F, 70000.0F, 60000.0F, 50000.0F, 60000.0F, 70000.0F, 80000.0F, 90000.0F,
        100000.0F, 90000.0F, 80000.0F, 70000.0F, 60000.0F, 50000.0F, 60000.0F, 70000.0F, 80000.0F, 90000.0F,
        100000.0F, 90000.0F, 80000.0F, 70000.0F, 60000.0F, 80000.0F, 70000.0F, 60000.0F, 50000.0F, 60000.0F);

    public static List<Boolean> sampleHasLighting = Arrays.asList(
        true, false, true, false, true, false, true, true, false, true, false, true, true, false, true,
        false, false, true, false, true, true, false, true, true, false, true, false, true, false, true,
        true, false, true, true, false, false, true, true, false, true, false, true, true, false, true);

    public static List<Boolean> sampleHasSignage = Arrays.asList(
        true, true, false, false, true, true, true, false, false, true, false, false, true, true, false,
        false, true, false, true, true, false, true, true, false, true, true, false, false, true, false,
        true, true, false, true, true, false, true, true, false, true, true, false, true, false, true);
  }
}
