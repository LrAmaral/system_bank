package com.systembank.app.rest.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.systembank.app.rest.Models.Slot;

@Repository
public interface SlotRepository extends JpaRepository<Slot, Integer> {
}
