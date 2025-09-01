package com.vitalapp.infrastructure.web.dto;

public class ExerciseDto {
    private String name;
    private String instructions;
    private String videoUrl;
    private String type;
    private Integer orderIndex;

    public ExerciseDto() {}

    public ExerciseDto(String name, String instructions, String videoUrl, String type, Integer orderIndex) {
        this.name = name;
        this.instructions = instructions;
        this.videoUrl = videoUrl;
        this.type = type;
        this.orderIndex = orderIndex;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getInstructions() { return instructions; }
    public void setInstructions(String instructions) { this.instructions = instructions; }
    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public Integer getOrderIndex() { return orderIndex; }
    public void setOrderIndex(Integer orderIndex) { this.orderIndex = orderIndex; }
}
