package com.flightcoordinator.server.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapKeyEnumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "system_role_table")
public class SystemRoleEntity {
  public enum SystemPermission {
    CREATE,
    READ,
    UPDATE,
    DELETE;
  }

  public enum SystemResource {
    AIRPORT,
    ALGO_RESULT,
    ALGO_RUN,
    CERT,
    CREW,
    FLIGHT,
    PLANE,
    ROUTE,
    RUNWAY,
    SYS_ROLE,
    USER_ALL,
    USER_SELF,
    VEHICLE;
  }

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Column(name = "role_name", nullable = false)
  private String roleName;

  @ElementCollection
  @CollectionTable(name = "role_permissions", joinColumns = @JoinColumn(name = "role_id"))
  @MapKeyEnumerated(EnumType.STRING)
  @Column(name = "permission")
  private Map<SystemResource, List<SystemPermission>> permissionPerResource;

  // One-to-many relationship with UserEntity
  @OneToMany(mappedBy = "role", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private Set<UserEntity> assignedUsers;

  public SystemRoleEntity() {
  }

  public SystemRoleEntity(String id, String roleName, Map<SystemResource, List<SystemPermission>> permissionPerResource,
      Set<UserEntity> assignedUsers) {
    this.id = id;
    this.roleName = roleName;
    this.permissionPerResource = permissionPerResource;
    this.assignedUsers = assignedUsers;
  }

  // Getters and Setters
  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getRoleName() {
    return roleName;
  }

  public void setRoleName(String roleName) {
    this.roleName = roleName;
  }

  public Map<SystemResource, List<SystemPermission>> getPermissionPerResource() {
    return permissionPerResource;
  }

  public void setPermissionPerResource(Map<SystemResource, List<SystemPermission>> permissionPerResource) {
    this.permissionPerResource = permissionPerResource;
  }

  public Set<UserEntity> getAssignedUsers() {
    return assignedUsers;
  }

  public void setAssignedUsers(Set<UserEntity> assignedUsers) {
    this.assignedUsers = assignedUsers;
  }

  public List<String> getAllPermissions() {
    List<String> allPermissionsAsList = new ArrayList<>();

    for (Map.Entry<SystemResource, List<SystemPermission>> entry : permissionPerResource.entrySet()) {
      SystemResource resource = entry.getKey();
      List<SystemPermission> permissions = entry.getValue();

      for (SystemPermission permission : permissions) {
        allPermissionsAsList.add(resource.name() + "_" + permission.name());
      }
    }
    return allPermissionsAsList;
  }
}
