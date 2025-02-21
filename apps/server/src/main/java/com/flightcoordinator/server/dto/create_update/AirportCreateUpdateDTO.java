package com.flightcoordinator.server.dto.create_update;

import com.flightcoordinator.server.enums.AirportType;
import com.flightcoordinator.server.enums.CountryCode;

public class AirportCreateUpdateDTO {
  private String id;
  private String name;
  private String iataCode;
  private String icaoCode;
  private CountryCode countryCode;
  private AirportType type;

  public AirportCreateUpdateDTO() {
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getIataCode() {
    return iataCode;
  }

  public void setIataCode(String iataCode) {
    this.iataCode = iataCode;
  }

  public String getIcaoCode() {
    return icaoCode;
  }

  public void setIcaoCode(String icaoCode) {
    this.icaoCode = icaoCode;
  }

  public CountryCode getCountryCode() {
    return countryCode;
  }

  public void setCountryCode(CountryCode countryCode) {
    this.countryCode = countryCode;
  }

  public AirportType getType() {
    return type;
  }

  public void setType(AirportType type) {
    this.type = type;
  }
}
