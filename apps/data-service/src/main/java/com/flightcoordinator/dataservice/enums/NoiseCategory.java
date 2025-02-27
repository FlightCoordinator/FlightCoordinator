package com.flightcoordinator.dataservice.enums;

public enum NoiseCategory {
  CHAPTER_2("Chapter 2 - Older, louder aircraft"),
  CHAPTER_3("Chapter 3 - Modern aircraft with standard noise levels"),
  CHAPTER_4("Chapter 4 - Latest generation, significantly quieter"),
  CHAPTER_14("Chapter 14 - Most recent standard, strictest noise regulations");

  public final String name;

  private NoiseCategory(String name) {
    this.name = name;
  }
}
